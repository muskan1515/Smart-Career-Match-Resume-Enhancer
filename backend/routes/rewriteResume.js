const express = require("express");
const {
  rewriteTehResumeThroughLLM,
} = require("../controllers/rewriteResumeController");

const router = express.Router();

router.post("/", rewriteTehResumeThroughLLM);

module.exports = router;
