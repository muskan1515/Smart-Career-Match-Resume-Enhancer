"use client";
import { useState } from "react";
import { MatchResult } from "./types";
import UploadForm from "./UploadForm";
import { InsightsView } from "./ResumeMatchInsights";

export default function UploadResumeMatcher() {
  const [resumeInsights, setResumeInsights] = useState<MatchResult | undefined>(
    undefined
  );

  const onResult = (data: MatchResult | undefined) => {
    setResumeInsights(data);
  };

  return (
    <div>
      <UploadForm onResult={onResult} />
      {resumeInsights && (
        <div>
          <InsightsView
            jdRole={resumeInsights.jd_role_prediction}
            matchScore={resumeInsights.fit_score}
            confidence={resumeInsights.jd_confidence}
            commonSkills={resumeInsights.matched_skills}
            missingSkills={resumeInsights.missing_skills}
            suggestions={resumeInsights.recommendations}
            resumeKeywords={resumeInsights.resume_keywords}
            jdKeywords={resumeInsights.job_keywords}
            experience_years={resumeInsights.experience_years}
            parsed_jd_text={resumeInsights.parsed_jd_text}
            parsed_resume_text={resumeInsights.parsed_resume_text}
          />
        </div>
      )}
    </div>
  );
}
