import { useState } from "react";
import { predictImage } from "../services/predictService";

export default function Classify() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const data = await predictImage(file);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>จำแนกผัก</h1>

      <input type="file" onChange={handleUpload} />

      {loading && <p>กำลังประมวลผล...</p>}

      {result && (
        <div>
          <h2>ผลลัพธ์:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
