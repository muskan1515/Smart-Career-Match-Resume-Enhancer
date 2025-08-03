// components/ServerDownModal.tsx
'use client';

import React from 'react';

const ServerDownModal = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Server Unreachable</h2>
        <p className="text-gray-700">
          We&apos;re having trouble connecting to the server. Please try again later.
        </p>
      </div>
    </div>
  );
};

export default ServerDownModal;
