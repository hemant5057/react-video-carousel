import "./App.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RecordingFrame from "./component/RecordingFrame";
import VideoFrame from "./component/VideoFrame";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";

function App() {
  const [videos, setVideos] = useState([]);

  const addRecordedVideo = (recordedVideoURL) => {
    setVideos([...videos, { url: recordedVideoURL }]);
  };

  const defaultURLs = [
    {
      url: "https://video.famd5-3.fna.fbcdn.net/v/t42.9040-2/66677312_348617326063950_4511323000770920448_n.mp4?_nc_cat=106&ccb=1-7&_nc_sid=55d0d3&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=bKWGW2XO7TMAX9a1F1n&_nc_rml=0&_nc_ht=video.famd5-3.fna&oh=00_AfBVpudsf6C3p6-0JKv6Bea5UVfvhPeA8-AcSnuSPw6yhQ&oe=65D9FC13",
    },
    {
      url: "https://video.famd5-3.fna.fbcdn.net/v/t42.9040-2/66677312_348617326063950_4511323000770920448_n.mp4?_nc_cat=106&ccb=1-7&_nc_sid=55d0d3&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=bKWGW2XO7TMAX9a1F1n&_nc_rml=0&_nc_ht=video.famd5-3.fna&oh=00_AfBVpudsf6C3p6-0JKv6Bea5UVfvhPeA8-AcSnuSPw6yhQ&oe=65D9FC13",
    },
    {
      url: "",
    },
    {
      url: "https://video.famd5-3.fna.fbcdn.net/v/t42.9040-2/66677312_348617326063950_4511323000770920448_n.mp4?_nc_cat=106&ccb=1-7&_nc_sid=55d0d3&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=bKWGW2XO7TMAX9a1F1n&_nc_rml=0&_nc_ht=video.famd5-3.fna&oh=00_AfBVpudsf6C3p6-0JKv6Bea5UVfvhPeA8-AcSnuSPw6yhQ&oe=65D9FC13",
    },
  ];

  return (
    <div className="App">
      <h1>React Video Carousel</h1>
      <Carousel
        className="crsl"
        autoPlay
        infiniteLoop
        centerMode
        interval={1000}
      >
        {[...defaultURLs, ...videos].map((video, i) => (
          <VideoFrame key={i} url={video.url} />
        ))}
      </Carousel>

      <div className="record">
        <RecordingFrame onRecordingStop={addRecordedVideo} />
      </div>
    </div>
  );
}

export default App;
