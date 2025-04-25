import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

type UploadStatus = "idle" | "uploading" | "succesful" | "error"

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user"
};

const WebcamCapture = () => {
  const [status, setStatus] = useState<UploadStatus>("idle")
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  async function handleFileUpload(){
    if (!url) return;

    setStatus("uploading");

    const formData = new FormData();
    formData.append("image", url);

    //Not sure how this will be sent to backend but assuming something similar
    try {
        await fetch("ADD BACKEND URL", {
            method: "POST",
            headers: {
                "Content-Type" : "multipart/form-data",
            },
            //body: json string of formData i think?
        });

        setStatus("succesful");
    } catch {
        setStatus("error");
    }
}

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
          <div>
            <button onClick={() => {(handleFileUpload);
              setUrl(null);
            }}>
              Upload
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default WebcamCapture;