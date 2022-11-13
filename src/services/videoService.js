import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://tjdjhdwfqhlcjcqxrwmp.supabase.co";
const SUP_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZGpoZHdmcWhsY2pjcXhyd21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDA3MDksImV4cCI6MTk4Mzc3NjcwOX0.pVf0Qmzelk0uW53eeLhm5g6vjHbcPj79k41KC6TfBrQ";
const supabase = createClient(PROJECT_URL, SUP_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("playlstdb")
                    .select("*");
        }
    }
}
