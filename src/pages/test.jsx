import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkYXVsYmhkZWhlb2NtZHV2bXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTEwMTgsImV4cCI6MjA1NTc4NzAxOH0.xCFsJVMudn2CV3hFjOrQ3PdFi8-ra4pM2YNhbNJBHD4`;

const url = "https://udaulbhdeheocmduvmtn.supabase.co";

export default function FileUploadTest() {
  const [file, setFile] = useState(null);

  function handleUpload() {
    if (file == null) {
      alert("Please select a file to upload");
      return;
    }
    console.log(file);

    const fileName = file.name;
    const extension = fileName.split(".").pop();
    console.log(extension);

    const supabase = createClient(url, key);

    supabase.storage
      .from("images")
      .upload(file.name, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((res) => {
        console.log(res);
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
