// services/jobScraper.js
const puppeteer = require('puppeteer');

function calculateMatchScore(text, keywords) {
  const lowered = text.toLowerCase();
  const matched = keywords.filter(k => lowered.includes(k.toLowerCase()));
  return {
    score: matched.length,
    matched_keywords: matched,
    missing_keywords: keywords.filter(k => !matched.includes(k))
  };
}

function getExperienceFilter(experienceYears) {
    if (experienceYears <= 1) return '1,2';        // Internship, Entry
    if (experienceYears <= 3) return '2,3';        // Entry, Associate
    if (experienceYears <= 6) return '3,4';        // Associate, Mid-Senior
    if (experienceYears <= 10) return '4,5';       // Mid-Senior, Director
    return '5,6';                                   // Director, Executive
}


async function scrapeJobs(keywords, experience_years) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const year_tag = getExperienceFilter(experience_years)

  const query = keywords.join('+');
  const url = `https://www.linkedin.com/jobs/search/?keywords=${query}&location=India&f_E=${year_tag}&f_TPR=r86400`;
  await page.goto(url, { waitUntil: 'networkidle2' });

  const rawJobs = await page.evaluate(() => {
    const jobNodes = document.querySelectorAll('.jobs-search__results-list li');
    const results = [];

    jobNodes.forEach(job => {
      const title = job.querySelector('h3')?.innerText || '';
      const company = job.querySelector('h4')?.innerText || '';
      const link = job.querySelector('a')?.href || '';
      const description = job.innerText.slice(0, 300);
      results.push({ title, company, link, description });
    });

    return results;
  });

  const enrichedJobs = rawJobs.map(job => {
    const combinedText = `${job.title} ${job.description}`;
    const match = calculateMatchScore(combinedText, keywords);
    return {
      ...job,
      match_score: match.score,
      matched_keywords: match.matched_keywords,
      missing_keywords: match.missing_keywords
    };
  });

  enrichedJobs.sort((a, b) => b.match_score - a.match_score);
  const topJobs = enrichedJobs.slice(0, 10);

  await browser.close();
  return topJobs;
}

module.exports = { scrapeJobs };
