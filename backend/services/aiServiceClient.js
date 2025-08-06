const axios = require('axios');

exports.analyze = async (resumeText, jdText) => {
  const response = await axios.post('http://127.0.0.1:8000/analyze', {
    resume: resumeText,
    job_description: jdText
  });

  return response.data;
};

exports.rewrite = async (resume_text, jd_text, missing_skills) => {
  const response = await axios.post('http://127.0.0.1:8000/rewrite-resume', {
    missing_skills,
    resume_text,
    jd_text
  });

  return response.data;
};