import React, { useState, useRef } from "react";

function Detection() {
  const [counts, setCounts] = useState({});
  const [frame, setFrame] = useState("");
  const [loading, setLoading] = useState(false);
  const wsRef = useRef(null);

  const upload = async (file) => {
    const form = new FormData();
    form.append("file", file);
    setLoading(true);

    const res = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    setLoading(false);

    startWebSocket(data.path);
  };

  const startWebSocket = (path) => {
    wsRef.current = new WebSocket("ws://localhost:8000/ws/process");

    wsRef.current.onopen = () => {
      wsRef.current.send(JSON.stringify({ path }));
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCounts(data.counts);
      setFrame(data.frame);
    };

    wsRef.current.onerror = (e) => {
      console.error("WebSocket error", e);
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket closed");
    };
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🚦 Live YOLO Vehicle Detection</h1>

      <input
        type="file"
        accept="video/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) upload(file);
        }}
      />

      {loading && <p>⏳ Uploading...</p>}

      {frame && (
        <img
          src={`data:image/jpeg;base64,${frame}`}
          alt="Detected Frame"
          style={{ width: "640px", marginTop: "1rem", border: "2px solid black" }}
        />
      )}

      {Object.keys(counts).length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Live Object Count</h3>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Object</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(counts).map(([key, val]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Detection;