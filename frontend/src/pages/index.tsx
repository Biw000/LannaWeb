import React, { useState } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Classify() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setResult(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("กรุณาเลือกรูปก่อน");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const res = await fetch(`${API_BASE}/predict/`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการอัปโหลด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">

        <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
          🌿 Vegetable Classification
        </h1>

        {/* File Input */}
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded-lg p-2"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="mb-4 text-center">
            <img
              src={preview}
              alt="preview"
              className="mx-auto rounded-lg max-h-64 object-cover shadow"
            />
          </div>
        )}

        {/* Predict Button */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition font-semibold"
        >
          {loading ? "🔄 AI กำลังวิเคราะห์..." : "🚀 Predict"}
        </button>

        {/* Error */}
        {error && (
          <div className="mt-4 text-red-500 text-center font-medium">
            {error}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-semibold mb-2 text-center text-green-700">
              🎯 Prediction Result
            </h3>

            <div className="text-center text-lg font-bold">
              {result.class_name}
            </div>

            <div className="text-center text-sm mb-3">
              Confidence: {(result.confidence * 100).toFixed(2)}%
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${(result.confidence * 100).toFixed(2)}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
