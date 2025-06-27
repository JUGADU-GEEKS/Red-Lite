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

app = FastAPI()

# Allow React frontend CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use your frontend URL in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = YOLO("yolov8n.pt")

# Classes we want to count
target_classes = {
    "car", "person", "truck", "bus", "motorbike", "ambulance"  # ambulance needs custom model!
}

@app.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    video_path = "temp_video.mp4"
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return JSONResponse(content={"path": video_path})

@app.websocket("/ws/process")
async def process_video(websocket: WebSocket):
    await websocket.accept()
    try:
        msg = await websocket.receive_text()
        data = json.loads(msg)
        video_path = data["path"]

        cap = cv2.VideoCapture(video_path)

        while cap.isOpened():
            success, frame = cap.read()
            if not success:
                break

            detections = model.predict(frame)[0]
            counts = {k: 0 for k in target_classes}

            for box in detections.boxes.cls:
                label = model.names[int(box)]
                if label in counts:
                    counts[label] += 1

            annotated = detections.plot()
            _, jpeg = cv2.imencode('.jpg', annotated)
            b64 = base64.b64encode(jpeg.tobytes()).decode("utf-8")

            await websocket.send_text(json.dumps({
                "counts": counts,
                "frame": b64
            }))

            time.sleep(0.3)

        cap.release()
        await websocket.close()

    except WebSocketDisconnect:
        print("WebSocket disconnected.")
