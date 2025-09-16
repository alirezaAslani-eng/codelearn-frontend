import { useEffect, useRef, memo, useState } from "react";
// Dynamic dpendencies -- >
import addScript from "./addScript";
import addCss from "./addCss";
const VideoJs = ({ options, type = "video/mp4", src = "", poster = "" }) => {
  const videoRef = useRef(null); // Video Player Element <<<
  const PlayerRef = useRef(null); // Instance !!
  // Css -- >
  useEffect(() => {
    addCss(
      "https://cdn.jsdelivr.net/npm/video.js@8.10.0/dist/video-js.min.css"
    );
  }, []);

  const videoOptions = {
    controls: true,
    autoplay: false,
    poster,
    playbackRates: [1, 2, 3],
    ...options,
  };

  // Set up Video Player -- >
  useEffect(() => {
    if (!videoRef.current) return; // element shoud be conect !!
    if (window.videojs) {
      // if its loaded alredy !!
      PlayerRef.current = window.videojs(videoRef.current, videoOptions);
    } else {
      addScript(
        "https://cdn.jsdelivr.net/npm/video.js@8.23.3/dist/video.min.js", // add videoJs CDN <<
        "vjs-main" // script id <<
      ).then((videojs) => {
        if (!videojs || !window.videojs) return;
        PlayerRef.current = videojs(videoRef.current, videoOptions);
      });
    }
    return () => {
      // Clear up - > Instance <<
      if (PlayerRef.current) {
        PlayerRef.current.dispose();
        PlayerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player className="w-full h-full">
      <video ref={videoRef} className="video-js w-full h-full">
        <source src={src} type={type} />
      </video>
    </div>
  );
};

export default memo(VideoJs);
