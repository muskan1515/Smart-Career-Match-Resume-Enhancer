import React, { useState } from 'react';

type JobData = {
  title: string;
  company: string;
  link: string;
  description: string;
  match_score: number;
  matched_keywords: string[];
  missing_keywords: string[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: JobData[];
};

const JobMatchModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden p-4 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Matched Job Roles</h2>

        <div className="overflow-y-auto max-h-[75vh] space-y-4 pr-2">
          {data.map((job, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                </div>
                <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full">
                  Match Score: {job.match_score}/10
                </span>
              </div>

              <div className="mt-2">
                <p className="text-gray-700 text-sm line-clamp-3">
                  {expandedIndex === index
                    ? job.description
                    : job.description.slice(0, 200) + (job.description.length > 200 ? '...' : '')}
                </p>

                <button
                  className="text-blue-600 text-sm mt-1 hover:underline"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                >
                  {expandedIndex === index ? 'Show Less' : 'Read More'}
                </button>
              </div>

              {/* Tabs for Keywords */}
              <div className="mt-3">
                <details className="mb-2">
                  <summary className="cursor-pointer font-medium text-green-600">
                    ✅ Matched Keywords ({job.matched_keywords.length})
                  </summary>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm">
                    {job.matched_keywords.map((word, idx) => (
                      <span
                        key={idx}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </details>

                <details>
                  <summary className="cursor-pointer font-medium text-red-600">
                    ❌ Missing Keywords ({job.missing_keywords.length})
                  </summary>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm max-h-24 overflow-y-auto">
                    {job.missing_keywords.slice(0, 50).map((word, idx) => (
                      <span
                        key={idx}
                        className="bg-red-100 text-red-800 px-2 py-1 rounded-full"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </details>
              </div>

              {/* Apply Link */}
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-500 hover:underline text-sm"
              >
                🔗 View Job on LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobMatchModal;
