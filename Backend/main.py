from fastapi import FastAPI, UploadFile, File, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import cv2
import shutil
import os
import time
import base64
import json
import uuid
import asyncio
from typing import Dict, Set
import threading

app = FastAPI()

# Allow React frontend CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use your frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for managing concurrent processing
model = YOLO("yolov8n.pt")
active_connections: Dict[str, WebSocket] = {}
processing_tasks: Dict[str, asyncio.Task] = {}
video_paths: Dict[str, str] = {}

# Classes we want to count
target_classes = {
    "car", "person", "truck", "bus", "motorcycle", "bicycle", "ambulance"
}

# Print available YOLO classes for debugging
print("Available YOLO classes:")
for i, name in model.names.items():
    print(f"  {i}: {name}")

@app.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    # Generate unique session ID for this video
    session_id = str(uuid.uuid4())
    
    # Create unique video path for this session
    video_path = f"temp_video_{session_id}.mp4"
    
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Store the video path for this session
    video_paths[session_id] = video_path
    
    return JSONResponse(content={
        "path": video_path,
        "session_id": session_id
    })

async def process_video_session(session_id: str, video_path: str):
    """Process video for a specific session"""
    try:
        cap = cv2.VideoCapture(video_path)
        
        while cap.isOpened():
            # Check if connection is still active
            if session_id not in active_connections:
                break
                
            success, frame = cap.read()
            if not success:
                break

            # Process frame with YOLO
            detections = model.predict(frame)[0]
            counts = {k: 0 for k in target_classes}

            for box in detections.boxes.cls:
                label = model.names[int(box)]
                if label in counts:
                    counts[label] += 1

            # Annotate frame
            annotated = detections.plot()
            _, jpeg = cv2.imencode('.jpg', annotated)
            b64 = base64.b64encode(jpeg.tobytes()).decode("utf-8")

            # Send data to client
            websocket = active_connections.get(session_id)
            if websocket:
                await websocket.send_text(json.dumps({
                    "counts": counts,
                    "frame": b64,
                    "session_id": session_id
                }))

            # Small delay to control frame rate
            await asyncio.sleep(0.3)

        cap.release()
        
    except Exception as e:
        print(f"Error processing video for session {session_id}: {e}")
    finally:
        # Cleanup
        if session_id in processing_tasks:
            del processing_tasks[session_id]
        if session_id in video_paths:
            # Clean up video file
            try:
                os.remove(video_paths[session_id])
                del video_paths[session_id]
            except:
                pass

@app.websocket("/ws/process")
async def process_video(websocket: WebSocket):
    await websocket.accept()
    session_id = None
    
    try:
        # Receive initial message with session info
        msg = await websocket.receive_text()
        data = json.loads(msg)
        session_id = data.get("session_id")
        video_path = data.get("path")
        
        if not session_id or not video_path:
            await websocket.close()
            return
            
        # Store connection
        active_connections[session_id] = websocket
        
        # Start processing task
        task = asyncio.create_task(process_video_session(session_id, video_path))
        processing_tasks[session_id] = task
        
        # Wait for processing to complete or connection to close
        try:
            await task
        except asyncio.CancelledError:
            pass
            
    except WebSocketDisconnect:
        print(f"WebSocket disconnected for session {session_id}")
    except Exception as e:
        print(f"Error in WebSocket connection: {e}")
    finally:
        # Cleanup
        if session_id:
            if session_id in active_connections:
                del active_connections[session_id]
            if session_id in processing_tasks:
                processing_tasks[session_id].cancel()
                try:
                    await processing_tasks[session_id]
                except asyncio.CancelledError:
                    pass
                del processing_tasks[session_id]
            if session_id in video_paths:
                try:
                    os.remove(video_paths[session_id])
                    del video_paths[session_id]
                except:
                    pass

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    # Cancel all processing tasks
    for task in processing_tasks.values():
        task.cancel()
    
    # Wait for all tasks to complete
    if processing_tasks:
        await asyncio.gather(*processing_tasks.values(), return_exceptions=True)
    
    # Clean up video files
    for video_path in video_paths.values():
        try:
            os.remove(video_path)
        except:
            pass