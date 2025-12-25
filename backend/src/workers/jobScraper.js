import cron from 'node-cron';
import { scrapeJobs, expireStaleJobs } from '../services/jobScraperService.js';

export const startJobScraperWorker = () => {
  if (process.env.SCRAPER_ENABLED === 'true') {
    scrapeJobs();
    expireStaleJobs();

    cron.schedule('0 * * * *', async () => {
      await scrapeJobs();
      await expireStaleJobs();
    });

    console.log('✅ Job scraper worker started');
  }
};
