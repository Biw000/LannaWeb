import { useState } from "react";
import { classifyImage } from "../services/api";

export default function UploadPage() {
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await classifyImage(file);
    setResult(data);
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleUpload} />

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
