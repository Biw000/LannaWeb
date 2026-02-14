import React, { useState } from "react";
import { classifyImage } from "../services/api";

export default function Upload() {
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await classifyImage(file);
      setResult(data);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload Image</h1>

      <input type="file" onChange={handleUpload} />

      {result && (
        <pre style={{ marginTop: 20 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
