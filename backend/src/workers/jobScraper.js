import cron from 'node-cron';
import { scrapeJobs, expireStaleJobs } from '../services/jobScraperService.js';

export const startJobScraperWorker = () => {
  if (process.env.SCRAPER_ENABLED === 'true') {
    console.log('Starting job scraper worker...');
    
    scrapeJobs();
    expireStaleJobs();
    
    cron.schedule('0 * * * *', async () => {
      console.log('Running scheduled job scraper...');
      await scrapeJobs();
      await expireStaleJobs();
    });
    
    console.log('Job scraper worker started');
  }
};
