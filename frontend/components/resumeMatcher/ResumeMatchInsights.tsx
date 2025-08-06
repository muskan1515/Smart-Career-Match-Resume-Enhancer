import { Card } from "../common/ui/Card";
import { CardContent } from "../common/ui/CardContent";
import { Progress } from "../common/ui/Progress";
import { Badge } from "../common/ui/Badge";
import SuggestionButtons from "./SuggestionButtons";

type Props = {
  jdRole: string;
  matchScore: number;
  confidence: number;
  commonSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  resumeKeywords: string[];
  jdKeywords: string[];
  experience_years: number;
  parsed_resume_text: string;
  parsed_jd_text: string;
};

export function InsightsView({
  jdRole,
  matchScore,
  confidence,
  commonSkills,
  missingSkills,
  suggestions,
  resumeKeywords,
  jdKeywords,
  experience_years,
  parsed_jd_text,
  parsed_resume_text
}: Props) {
  return (
    <Card className="p-6 mt-4 rounded-2xl shadow-lg bg-white dark:bg-neutral-900 space-y-6">
      <CardContent className="space-y-6">
        {/* JD Role */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            🧑‍💼 Job Role:{" "}
            <span className="text-blue-600 dark:text-blue-400">{jdRole}</span>
          </h2>
        </div>

        {/* Progress Bars */}
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Match Score
            </p>
            <Progress value={matchScore} className="h-3 bg-green-100" />
            <p className="text-sm text-muted-foreground mt-1">
              {Math.round(matchScore)}%
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              JD Confidence
            </p>
            <Progress value={confidence * 100} className="h-3 bg-blue-100" />
            <p className="text-sm text-muted-foreground mt-1">
              {Math.round(confidence * 100)}%
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold text-green-600 mb-2">
              ✅ Matched Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {commonSkills?.map((skill) => (
                <Badge key={skill} variant="green">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-red-600 mb-2">
              ❌ Missing Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {missingSkills?.map((skill) => (
                <Badge key={skill} variant="red">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Keywords Section */}
        {/* <div className="grid md:grid-cols-2 gap-4 pt-4">
          <div>
            <p className="text-sm font-medium text-blue-600 mb-2">
              📝 Resume Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {resumeKeywords?.map((keyword) => (
                <Badge key={keyword} variant="blue">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-600 mb-2">
              📄 JD Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {jdKeywords?.map((keyword) => (
                <Badge key={keyword} variant="purple">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        </div> */}

        {/* Suggestions */}
        <div className="pt-4">
          <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-200">
            💡 Suggestions
          </p>
          <ul className="list-disc ml-5 text-sm text-muted-foreground space-y-1">
            {suggestions?.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {/* User Options */}
        <SuggestionButtons
          jdRole={jdRole}
          experience_years={experience_years}
          resume_keywords={resumeKeywords}
          missingSkills={missingSkills}
          parsed_jd_text={parsed_jd_text}
          parsed_resume_text={parsed_resume_text}
        />
      </CardContent>
    </Card>
  );
}
