import { useState } from "react";
import uploadMediaToSupabase from "../utils/mediaUpload";

export default function FileUploadTest() {
  const [file, setFile] = useState(null);

  function handleUpload() {
    uploadMediaToSupabase(file)
      .then((url) => {
        console.log("File uploaded successfully:", url);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }
  return (
    <div>
      <h1>File upload test</h1>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
      />
      <button onClick={handleUpload}>Submit</button>
    </div>
  );
}
