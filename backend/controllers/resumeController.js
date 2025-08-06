const fs = require('fs');
const path = require('path');
const parsePDF = require('../utils/pdfParser');
const aiServiceClient = require('../services/aiServiceClient');

exports.uploadAndAnalyze = async (req, res) => {
  try {
    //get the uploaded file path
    const resumePath = req.files['resume'][0].path;

    //generated both resume and jd text 
    const jdText = req.body.job_description;
    const resumeText = await parsePDF(resumePath);

    const response = await aiServiceClient.analyze(resumeText, jdText);
  
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (err) {
    console.error('Error in uploadAndAnalyze:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
