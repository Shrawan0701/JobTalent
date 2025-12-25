import { GREENHOUSE_COMPANIES } from '../config/greenhouse.js';
import { JOB_SOURCES } from '../config/constants.js';
import { fetchGreenhouseJobs } from './greenhouseService.js';
import { normalizeGreenhouseJob } from './jobNormalizer.js';
import { upsertAggregatedJob } from './jobRepository.js';
import { query } from '../config/database.js';

export const scrapeJobs = async () => {
  console.log('🔄 Greenhouse scraping started');

  for (const company of GREENHOUSE_COMPANIES) {
    try {
      const jobs = await fetchGreenhouseJobs(company.boardToken);

      for (const ghJob of jobs) {
        const job = normalizeGreenhouseJob(ghJob, company);
        await upsertAggregatedJob(job);
      }

      console.log(`✅ ${company.name}: ${jobs.length} jobs`);
    } catch (err) {
      console.error(`❌ ${company.name}`, err.message);
    }
  }
};

export const expireStaleJobs = async () => {
  await query(
    `
    UPDATE jobs
    SET status = 'inactive'
    WHERE source = $1
      AND updated_at < NOW() - INTERVAL '7 days'
    `,
    [JOB_SOURCES.AGGREGATED]
  );
};
