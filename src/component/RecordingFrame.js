// import React, { useState, useRef } from 'react';
// import './RecordingFrame.css';

// const RecordingFrame = () => {
//   const videoRef = useRef(null);
//   const [mediaStream, setMediaStream] = useState(null);

//   const handleStartRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     setMediaStream(stream);
//     videoRef.current.srcObject = stream;
//     videoRef.current.play();
//   };

//   const handleStopRecording = () => {
//     const tracks = mediaStream.getTracks();
//     tracks.forEach(track => track.stop());
//     setMediaStream(null);
//   };

//   return (
//     <div className="recording-frame">
//       <video ref={videoRef} width="100%" height="100%" controls={true} />
//       <div>
//         <button onClick={handleStartRecording}>Start Recording</button>
//         <button onClick={handleStopRecording}>Stop Recording</button>
//       </div>
//     </div>
//   );
// };

// export default RecordingFrame;

import React, { useRef, useState } from "react";

const RecordingFrame = ({ onRecordingStop }) => {
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setRecording(true);
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };

      recorder.start();
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      setRecording(false);
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const recordedVideoURL = URL.createObjectURL(blob);
      onRecordingStop(recordedVideoURL);
      setRecordedChunks([]);
    }
  };

  return (
    <div className="recording-frame">
      <video
        ref={videoRef}
        autoPlay
        muted
        width="100%"
        height="100%"
        controls
      />
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
    </div>
  );
};

export default RecordingFrame;
