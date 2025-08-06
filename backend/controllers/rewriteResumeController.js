const { rewrite } = require("../services/aiServiceClient");

exports.rewriteTehResumeThroughLLM = async (req, res) => {
  try {
    const { resume_text, jd_text, missing_skills } = req.body;

    if (
      !missing_skills ||
      !Array.isArray(missing_skills) ||
      !resume_text ||
      !jd_text
    ) {
      return res
        .status(400)
        .json({
          error:
            "missing_skills must be an array of strings and all parameter should be passed proeprly.",
        });
    }

    const response = await rewrite(resume_text, jd_text, missing_skills);

    console.log({response})
    
    res.status(200).json({
      success: true,
      data: {
         "rewritten_resume_txt": response.resume_text
      },
    });
  } catch (err) {
    console.error("Error in recommendSimilarJobs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
