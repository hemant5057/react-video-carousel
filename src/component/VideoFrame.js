import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./VideoFrame.css";
const VideoFrame = ({ url }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleReady = () => {
    setLoading(false);
  };

  const handleError = (err) => {
    setError(err.toString());
  };

  return (
    <div className="video-frame-container">
      <div className="video-frame">
        {loading && (
          <div className="spinner-error-container">
            <div className="spinner" />
          </div>
        )}
        {error && (
          <div className="spinner-error-container">
            <p className="error-message">Error: {error}</p>
          </div>
        )}
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls={true}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
          onError={handleError}
          onReady={handleReady}
        />
      </div>
    </div>
  );
};

export default VideoFrame;
