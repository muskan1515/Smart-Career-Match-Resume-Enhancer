const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const healthRoutes = require('./routes/health');
const resumeRoutes = require('./routes/resume');
const recommendationRoutes = require('./routes/recommendation');
const rewriteResumeRoutes = require('./routes/rewriteResume');

const app = express();

const allowedOrigin = [process.env.CLIENT_URL || 'http://localhost:3000'];

app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/api/health', healthRoutes);
app.use('/api/upload-resume', resumeRoutes);
app.use('/api/job-recommendations', recommendationRoutes);
app.use('/api/rewrite-resume', rewriteResumeRoutes);

app.use((_, res) => {
  res.status(404).json({ message: 'API route not found' });
});

module.exports = app;
