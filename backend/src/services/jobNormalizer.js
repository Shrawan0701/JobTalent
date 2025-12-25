export const normalizeGreenhouseJob = (ghJob, company) => {
  return {
    title: ghJob.title,
    description:
      ghJob.content ||
      ghJob.description ||
      'Job description not provided by employer.',
    location: ghJob.location?.name || 'Remote',
    jobType: ghJob.metadata?.find(m => m.name === 'Employment Type')?.value || null,
    source: 'aggregated',
    sourceJobId: `${company.name}-${ghJob.id}`,
    companyName: company.name,
    companyWebsite: company.website,
    applyUrl: ghJob.absolute_url,
  };
};
