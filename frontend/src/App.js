import { useState, useRef, useEffect } from "react";
import "./App.css";

export default function PdfChatUI() {
  const [files, setFiles] = useState([]);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessed, setIsProcessed] = useState(false);

  const chatEndRef = useRef(null);

  // 🔽 Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📂 Handle file selection
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    setFiles((prevFiles) => {
      const allFiles = [...prevFiles, ...newFiles];

      const uniqueFiles = Array.from(
        new Map(allFiles.map((file) => [file.name, file])).values()
      );

      return uniqueFiles;
    });

    setIsProcessed(false);
  };

  // 🚀 Upload PDFs
  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setUploading(true);
      setUploadProgress(0);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:5000/api/upload");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        setIsProcessed(true);
        alert("PDFs processed successfully ✅");
      };

      xhr.onerror = () => {
        console.error("Upload failed");
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  // 💬 Chat API (FIXED STREAMING)
  const handleSubmit = async () => {
    if (!query.trim()) return;

    if (!isProcessed) {
      alert("Please process PDFs first!");
      return;
    }

    const userMessage = { role: "user", content: query };

    // ✅ Add assistant placeholder
    setMessages((prev) => [
      ...prev,
      userMessage,
      { role: "assistant", content: "" },
    ]);

    setQuery("");

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let done = false;
      let accumulated = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        const chunk = decoder.decode(value);
        accumulated += chunk;
        const currentText = accumulated;

        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: currentText },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ❌ Remove file
  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setIsProcessed(false);
  };

  return (
    <div className="app-container">
      {/* 📂 Sidebar */}
      <div className="sidebar">
        <h2>📄 PDF Chat</h2>

        <label className="upload-btn">
          Upload PDFs
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
          />
        </label>

        {/* 📄 File list */}
        {files.length > 0 && (
          <div className="file-name">
            {files.map((file, i) => (
              <div key={i} className="file-item">
                <p>{file.name}</p>
                <button onClick={() => handleRemoveFile(i)}>❌</button>
              </div>
            ))}
          </div>
        )}

        <button onClick={handleUpload} disabled={uploading}>
          {uploading ? "Processing PDFs..." : "Process PDFs"}
        </button>

        {/* 📊 Progress */}
        {uploading && (
          <div className="progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p>{uploadProgress}%</p>
          </div>
        )}

        {isProcessed && <p className="ready">✅ Ready to chat</p>}
      </div>

      {/* 💬 Chat Section */}
      <div className="chat-container">
        <div className="chat-header">Chat with your PDFs</div>

        <div className="chat-body">
          {messages.length === 0 && (
            <p className="placeholder">
              Upload PDFs and start asking questions 🚀
            </p>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}

          {loading && <p className="loading">Thinking...</p>}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isProcessed
                ? "Ask something about your PDFs..."
                : "Process PDFs first..."
            }
            disabled={!isProcessed}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          <button onClick={handleSubmit} disabled={!isProcessed || loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}