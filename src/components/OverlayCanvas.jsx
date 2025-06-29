
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { saveAs } from "file-saver";
import DownloadIcon from  "../assets/downloadSVG.svg?react"; 


const OverlayCanvas = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 640, height: 480 });

  useEffect(() => {
    const img = new Image();
    img.src = "/Grinch.png";
    img.onload = () => {
      console.log("Overlay image loaded:", img);
      setOverlayImage(img);
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight }); // Dynamically set size
    };
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    ctx.drawImage(webcamRef.current.video, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);

    setCapturedImage(canvas.toDataURL("image/png"));
  };

  const shareImage = async () => {
  if (!capturedImage) {
    alert("Capture an image first!");
    return;
  }

  if (navigator.share) {
    try {
      // Convert base64 image to a Blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], "photo-booth.png", { type: "image/png" });

      // Open share dialog
      await navigator.share({
        files: [file],
        title: "Check out my photo!",
        text: "Here’s my face-in-the-hole photo!",
      });
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  } else {
    alert("Sharing is not supported on this device.");
  }
};

const downloadImage = () => {
  if (!capturedImage) return;

  // Convert the base64 image to a Blob
  const byteCharacters = atob(capturedImage.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/png" });

  // Save the file
  saveAs(blob, "photo-booth.png");
};


  return (
    <div className="container">
      <div className="camera-container" style={{ width: dimensions.width, height: dimensions.height }}>
        <Webcam ref={webcamRef} className="webcam" videoConstraints={{ width: dimensions.width, height: dimensions.height }} />
        <img src="/Grinch.png" className="overlay" alt="Face Overlay" />
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <button onClick={captureImage}>Take Picture</button>

      {capturedImage && <button onClick={shareImage}>Share Photo</button>}

      {capturedImage && <button onClick={downloadImage}>
        <DownloadIcon className/>
        </button>}
      {capturedImage && <img src={capturedImage} alt="Captured Image" />}

      
    </div>
  );
};

export default OverlayCanvas;