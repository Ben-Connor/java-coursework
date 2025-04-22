import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user"
};

const WebcamCapture = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>Take a photo!</button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>end </button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={capture}>capture</button>
        </>
      )}
      {url && (
        <>
          <div>
            <button
              onClick={() => {
                setUrl(null);
              }}
            >
              delete
            </button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
    </>
  );
};

export default WebcamCapture;