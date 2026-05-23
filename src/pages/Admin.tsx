import { useState, ChangeEvent } from "react";
import { UploadCloud, CheckCircle, AlertCircle, PlayCircle, Download } from "lucide-react";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export function Admin() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const handleSaveUrl = async () => {
    if (!urlInput) return;
    setUploading(true);
    setStatus("idle");
    try {
      await setDoc(doc(db, "app", "metadata"), {
        latestApkUrl: urlInput,
        updatedAt: new Date().toISOString()
      });
      setStatus("success");
      setMessage("Download link updated successfully!");
      setUrlInput("");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "Failed to save link.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setStatus("idle");
      setMessage("");
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setStatus("idle");
    setMessage("");

    try {
      const storageRef = ref(storage, `apks/LumiPlayer-${Date.now()}.apk`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const p = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(p);
        },
        (error) => {
          setStatus("error");
          setMessage(error.message || "Failed to upload file to storage.");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          
          await setDoc(doc(db, "app", "metadata"), {
            latestApkUrl: downloadURL,
            updatedAt: new Date().toISOString()
          });

          setStatus("success");
          setMessage("APK uploaded successfully! The download link has been updated.");
          setFile(null);
          setUploading(false);
          setProgress(0);
        }
      );
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "An error occurred during upload.");
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-50 flex flex-col items-center justify-center p-6">
      
      <div className="max-w-md w-full bg-[#141414] border border-neutral-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-2">
           <PlayCircle className="w-8 h-8 text-yellow-400" />
           <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <p className="text-neutral-400 mb-8 text-sm">Upload a new APK version directly to Firebase. The homepage download link will update automatically.</p>

        <div className="space-y-6">
          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6">
            <h3 className="text-sm font-medium text-neutral-200 mb-4">Option 1: Paste Download Link (Easiest)</h3>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="e.g. https://domain.com/app.apk"
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <button 
                onClick={handleSaveUrl}
                disabled={!urlInput || uploading}
                className="bg-yellow-400 text-neutral-950 px-6 font-bold rounded-xl hover:bg-yellow-300 disabled:opacity-50 transition-colors"
              >
                Save Link
              </button>
            </div>
          </div>

          <div className="relative border-2 border-dashed border-neutral-700 bg-neutral-900/50 rounded-2xl p-8 text-center hover:bg-neutral-800/50 transition-colors">
            <h3 className="text-sm font-medium text-neutral-200 mb-4">Option 2: Direct APK Upload</h3>
            <input
              type="file"
              accept=".apk"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
              style={{ top: '3rem' }}
            />
            <div className="flex flex-col items-center justify-center gap-3">
              <UploadCloud className="w-10 h-10 text-yellow-500" />
              <div className="text-sm font-medium text-neutral-200">
                {file ? file.name : "Select or drag an APK file here"}
              </div>
              {!file && <div className="text-xs text-neutral-500">Note: Requires Firebase Storage to be enabled in Console</div>}
            </div>
          </div>

          {uploading && (
              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-yellow-400 h-1.5 transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full bg-yellow-400 text-neutral-950 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-neutral-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading... {Math.round(progress)}%
              </>
            ) : (
              "Upload APK"
            )}
          </button>

          {status === "success" && (
            <div className="flex items-start gap-3 text-green-400 bg-green-500/10 p-4 rounded-xl border border-green-500/20">
              <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">{message}</div>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-start gap-3 text-red-400 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">{message}</div>
            </div>
          )}
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <h3 className="text-sm font-medium text-neutral-200 mb-4">Export AI Studio Source Code</h3>
          <p className="text-xs text-neutral-400 mb-4">
            Download the complete source code of this React application to deploy somewhere else. 
            (AI Studio Export fallback)
          </p>
          <a
            href="/source.zip"
            download="Lumi-Player-Source.zip"
            className="w-full bg-neutral-800 text-neutral-200 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Source ZIP
          </a>
        </div>
      </div>
    </div>
  );
}
