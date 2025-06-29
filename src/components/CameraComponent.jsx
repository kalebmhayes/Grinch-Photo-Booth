import React, {useState} from "react";
import Webcam from "react-webcam";

const CameraComponent = () => {

    const [facingMode, setFacingMode] = useState("user");

    return (
        <div>
            <Webcam videoConstraints={{ facingMode}} />
            <button onClick={()=> setFacingMode(facingMode=="user" ? "environment" : "user")}>
                Switch Camera
            </button>
        </div>
    )
}

export default CameraComponent;
