import { htmlToText } from 'html-to-text';

export const normalizeGreenhouseJob = (job, company) => {
  const raw = job.content?.trim();

  const description =
    raw && raw.length > 50
      ? htmlToText(raw, { wordwrap: 120 })
      : null;

  return {
    title: job.title,
    description,
    location: job.location?.name || 'Remote',
    jobType:
      job.metadata?.find(m => m.name === 'Employment Type')?.value || null,
    source: 'aggregated',
    sourceJobId: `${company.name}-${job.id}`,
    companyName: company.name,
    companyWebsite: company.website,
    applyUrl: job.absolute_url,
  };
};
