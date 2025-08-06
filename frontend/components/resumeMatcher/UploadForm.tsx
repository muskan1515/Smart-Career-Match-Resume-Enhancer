"use client";

import { useState } from "react";
import { MatchResult } from "./types";
import { uploadResume } from "@/services/match-resume";
import { useGlobal } from "@/hooks/useGlobal";

export default function UploadForm({
  onResult,
}: {
  onResult: (data: MatchResult | undefined) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setLoading: setGlobalLoading, setMessage: setGlobalMsg } =
    useGlobal();

  const handleUpload = async () => {
    if (!file || !jobDescription.trim()) {
      setMessage("Upload a resume and paste job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("job_description", jobDescription);

    setLoading(true);
    setGlobalLoading(true);
    const res = await uploadResume({ formData });
    setGlobalLoading(false);
    setLoading(false);

    if (res.success) {
      setGlobalMsg("success", "Analyzed the resume and jd successfully.");
      onResult(res.data);
    } else {
      setGlobalMsg("error", "Something went wrong.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <h3 className="text-lg font-medium mb-2">
        Upload Resume & Job Description
      </h3>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3"
      />
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste job description..."
        rows={5}
        className="w-full p-2 border rounded mb-3"
      />
      {message && <p className="text-sm text-red-500">{message}</p>}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Analyze Fit"}
      </button>
    </div>
  );
}
