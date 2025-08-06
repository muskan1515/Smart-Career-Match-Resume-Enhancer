const express = require("express");
const multer = require("multer");
const { uploadAndAnalyze } = require("../controllers/resumeController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "job_description", maxCount: 1 },
  ]),
  uploadAndAnalyze
);

module.exports = router;
