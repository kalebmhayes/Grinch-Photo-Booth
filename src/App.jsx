import React from "react";
import CameraComponent from "./components/CameraComponent";
import OverlayCanvas from "./components/OverlayCanvas";
import "./App.css"; // Import your CSS file for styling

const App = () => {
  return (
    <div>
      <h1 className="title">Take your photo with Grinch and Max</h1>
      <div>
      </div>
      <OverlayCanvas  />
    </div>
  );
};

export default App;