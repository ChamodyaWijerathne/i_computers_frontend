import { createClient } from "@supabase/supabase-js"


const supabseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoeXhoeHBtcnB1cW1yaHV3cWp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0MzM1NjUsImV4cCI6MjA4NzAwOTU2NX0.LQRr5Ff1gaErsi3df8Ar8iicaLWwBhObBr0Vczd8Iv4"
const supabaseUrl = "https://rhyxhxpmrpuqmrhuwqjv.supabase.co"

const supabase = createClient(supabaseUrl, supabseKey)

export default function uploadFile(file) {
    return new Promise( 
        (resolve, reject) => {
            if(file==null){
                reject("No file selected");
                return
            }
            const timeStamp = new Date().getTime();
            const fileName = timeStamp + "_" + file.name;


            supabase.storage.from("images").upload(fileName, file, {
                upsert: false,
                cacheControl: "3600"
        }).then(
            ()=> {
                const url = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                resolve(url)
            }
        ).catch(
            ()=> {
                reject("Failed to upload the file")
            }
        )
    })
}