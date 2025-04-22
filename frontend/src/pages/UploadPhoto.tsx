import React, { ChangeEvent, useState } from "react";
import ReactWebcam from "react-webcam";

type UploadStatus = "idle" | "uploading" | "succesful" | "error";
const aspectRatios = {
    landscape: {
        width: 1920,
        height: 1080,
    },
    portrait: {
        width: 1080,
        height: 1920,
    },
}

function UploadPhoto() {
    const [im_file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>("idle")
    
    //Hardcoded for single file upload
    function handleFileChange(e: ChangeEvent<HTMLInputElement>){
        if (e.target.files){
            setFile(e.target.files[0]);
        }
    } 

    async function handleFileUpload(){
        if (!im_file) return;

        setStatus("uploading");

        const formData = new FormData();
        formData.append("image", im_file);

        //Not sure how this will be sent to backend but assuming something similar
        try {
            await fetch("ADD BACKEND URL", {
                method: "POST",
                headers: {
                    "Content-Type" : "multipart/form-data",
                },
            });

            setStatus("succesful");
        } catch {
            setStatus("error");
        }
    }

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            { im_file && (
                <div>
                    <p>Image Name : {im_file.name}</p>
                    <p>Size: {(im_file.size / 1024).toFixed(2)} KB</p>
                    <p>Type: {im_file.type}</p>
                </div>
            )}

            { im_file && status !== "uploading" && (
                <button onClick={handleFileUpload}>Upload</button>
            )}

            {status === "succesful" && (
                <p> Image Uploaded Succesfully</p>
            )}

            {status === "error" && (
                <p>Image Upload Failed. TRY AGAIN!!</p>
            )}
        </div>
    );
}

export default UploadPhoto;