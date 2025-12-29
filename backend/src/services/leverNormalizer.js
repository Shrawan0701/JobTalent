// src/services/leverNormalizer.js

export const normalizeLeverJob = (job, company) => {
  return {
    title: job.text?.slice(0, 255),

    description:
      job.descriptionPlainText ||
      job.description ||
      'Job description not provided by employer.',

    location: job.categories?.location || 'Remote',

    jobType: job.categories?.commitment || null,

    source: 'aggregated',

    sourceJobId: `${company.name}-${job.id}`,

    companyName: company.name,
    companyWebsite: company.website,

    applyUrl: job.hostedUrl,
  };
};
