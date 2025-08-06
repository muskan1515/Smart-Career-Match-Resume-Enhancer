const { scrapeJobs } = require("../services/jobScraper");

exports.recommendSimilarJobs = async (req, res) => {
  try {
    const { resume_keywords, experience_years } = req.body;

    if (!resume_keywords || !Array.isArray(resume_keywords)) {
      return res.status(400).json({ error: 'resume_keywords must be an array of strings' });
    }

    const jobs = await scrapeJobs(resume_keywords, experience_years);

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (err) {
    console.error('Error in recommendSimilarJobs:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
