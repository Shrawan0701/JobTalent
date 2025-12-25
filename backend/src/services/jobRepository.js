import { query } from '../config/database.js';

export const upsertAggregatedJob = async (job) => {
  await query(
    `
    INSERT INTO jobs (
      title,
      description,
      location,
      job_type,
      source,
      source_job_id,
      company_name,
      company_website,
      apply_url,
      status,
      created_at,
      updated_at
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,'active',NOW(),NOW())
    ON CONFLICT (source, source_job_id)
    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      location = EXCLUDED.location,
      job_type = EXCLUDED.job_type,
      apply_url = EXCLUDED.apply_url,
      updated_at = NOW(),
      status = 'active'
    `,
    [
      job.title,
      job.description,
      job.location,
      job.jobType,
      job.source,
      job.sourceJobId,
      job.companyName,
      job.companyWebsite,
      job.applyUrl,
    ]
  );
};
