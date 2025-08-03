'use client';

import { useState } from 'react';

export default function UploadResumeMatcher() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setMessage('');
    } else {
      setMessage('Only PDF files are allowed');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a PDF resume to upload.');
      return;
    }

    setStatus('uploading');
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Resume uploaded successfully!');
      } else {
        setStatus('error');
        setMessage('Upload failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Your Resume</h2>
      
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0 file:text-sm file:font-semibold
        file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
      />

      {file && <p className="text-sm text-gray-700 mb-2">Selected file: {file.name}</p>}
      {message && <p className={`text-sm mb-4 ${status === 'error' ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}

      <button
        onClick={handleUpload}
        disabled={status === 'uploading'}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {status === 'uploading' ? 'Uploading...' : 'Upload Resume'}
      </button>
    </div>
  );
}
