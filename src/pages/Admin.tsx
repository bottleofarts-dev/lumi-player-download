import { useState, ChangeEvent } from "react";
import { UploadCloud, CheckCircle, AlertCircle, PlayCircle, LogIn, LogOut } from "lucide-react";
import { auth, db, storage } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export function Admin() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(auth.currentUser);

  // Listen to auth changes
  useState(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  });

  const handleLogin = async () => {
    try {
      if (!user) {
        await signInWithPopup(auth, new GoogleAuthProvider());
      } else {
        await signOut(auth);
      }
    } catch (e: any) {
      alert("Error logging in: " + e.message);
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
    if (!file || !user) return;
    
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
      
      {/* Top Bar for Auth */}
      <div className="absolute top-6 right-6">
        <button 
          onClick={handleLogin}
          className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          {user ? (
            <><LogOut className="w-4 h-4" /> Sign Out</>
          ) : (
            <><LogIn className="w-4 h-4" /> Admin Login</>
          )}
        </button>
      </div>

      <div className="max-w-md w-full bg-[#141414] border border-neutral-800 rounded-3xl p-8 shadow-2xl">
        <div className="flex items-center gap-4 mb-2">
           <PlayCircle className="w-8 h-8 text-yellow-400" />
           <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>
        <p className="text-neutral-400 mb-8 text-sm">Upload a new APK version directly to Firebase. The homepage download link will update automatically.</p>

        {!user ? (
          <div className="text-center p-6 border border-neutral-800 border-dashed rounded-2xl bg-neutral-900/50">
             <p className="text-neutral-400 text-sm mb-4">You must be logged in as an administrator to upload an APK.</p>
             <button
               onClick={handleLogin}
               className="bg-yellow-400 text-neutral-950 font-bold py-2.5 px-6 rounded-xl hover:bg-yellow-300 transition-colors inline-flex items-center gap-2"
             >
               <LogIn className="w-4 h-4" />
               Sign In with Google
             </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative border-2 border-dashed border-neutral-700 bg-neutral-900/50 rounded-2xl p-8 text-center hover:bg-neutral-800/50 transition-colors">
              <input
                type="file"
                accept=".apk"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
              <div className="flex flex-col items-center justify-center gap-3">
                <UploadCloud className="w-10 h-10 text-yellow-500" />
                <div className="text-sm font-medium text-neutral-200">
                  {file ? file.name : "Select or drag an APK file here"}
                </div>
                {!file && <div className="text-xs text-neutral-500">Only .apk files are supported</div>}
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
        )}
      </div>
    </div>
  );
}
