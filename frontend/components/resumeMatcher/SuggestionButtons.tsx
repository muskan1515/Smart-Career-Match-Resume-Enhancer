import { getRecommendations } from "@/services/recommendations";
import { Job } from "@/types/recommendation_type";
import { useState } from "react";
import JobMatchModal from "./JobMatchModel";
import { getUpdatedResume } from "@/services/rewrite-resume";
import { useGlobal } from "@/hooks/useGlobal";

export default function SuggestionButtons({
  jdRole,
  missingSkills: missing_skills,
  resume_keywords,
  experience_years,
  parsed_jd_text: jd_text,
  parsed_resume_text: resume_text,
}: {
  jdRole: string;
  missingSkills: string[];
  resume_keywords: string[];
  experience_years: number;
  parsed_resume_text: string;
  parsed_jd_text: string;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[] | undefined>([]);
  const { setLoading, setMessage } = useGlobal();

  function downloadResumeAsTxtFile(
    resumeText: string,
    fileName = "resume.txt"
  ) {
    const blob = new Blob([resumeText], { type: "text/plain" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = fileName;
    a.style.display = "none";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setMessage("success", "Successfully downloaded the rewritten txt file.");
    // Clean up
    URL.revokeObjectURL(url);
  }

  const handleDownloadEnhancedResume = async () => {
    try {
      setLoading(true);
      const response = await getUpdatedResume({
        missing_skills,
        resume_text,
        jd_text,
      });

      if (response.success) {
        const rewritten_Resume = response.data?.rewritten_resume_txt;
        if (rewritten_Resume) {
          downloadResumeAsTxtFile(
            rewritten_Resume,
            `rewritten_resume${new Date().toISOString()}.txt`
          );
        }
      }

      setLoading(false);
    } catch (err) {
      setMessage("error", "Got error while generating the link");
      console.error({ err });
    }
  };

  const getJobsRecommendations = async () => {
    try {
      setLoading(true);
      const { success, data } = await getRecommendations({
        resume_keywords,
        experience_years,
      });
      if (success) {
        setMessage("success", "Fetched the job recommendations.");
        setOpen(true);
        setJobs(data);
      }

      setLoading(false);
    } catch (err) {
      setMessage(
        "error",
        `got error while fetching the recommendations ${err}`
      );
      console.error({ err });
    }
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={getJobsRecommendations}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        View {jdRole} Jobs
      </button>
      <button
        onClick={handleDownloadEnhancedResume}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Download Updated Resume
      </button>

      {jobs && (
        <JobMatchModal isOpen={open} data={jobs} onClose={closeHandler} />
      )}
    </div>
  );
}
