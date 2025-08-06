const express = require("express");
const {
  recommendSimilarJobs,
} = require("../controllers/recommendationController");

const router = express.Router();

router.post("/", recommendSimilarJobs);

module.exports = router;
