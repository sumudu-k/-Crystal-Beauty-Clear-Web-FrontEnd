import { createClient } from "@supabase/supabase-js";
const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkYXVsYmhkZWhlb2NtZHV2bXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTEwMTgsImV4cCI6MjA1NTc4NzAxOH0.xCFsJVMudn2CV3hFjOrQ3PdFi8-ra4pM2YNhbNJBHD4`;

const url = "https://udaulbhdeheocmduvmtn.supabase.co";

const supabase = createClient(url, key);

export default function uploadMediaToSupabase(file){

    return new Promise((resolve,reject)=>{
        if(file==null){
            reject("Please select a file to upload");
            //return;
        }
        let fileName = file.name;
    const extension = fileName.split(".").pop();


    const timestamp = new Date().getTime();
    fileName = timestamp +file.name+ "." + extension;


    supabase.storage.from("images").upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    }).then(()=>{
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
        console.log(publicUrl);
        resolve(publicUrl);
    }).catch((error)=>{
        console.error("Error uploading file:", error);
        reject(error);

    });
})
}
    

