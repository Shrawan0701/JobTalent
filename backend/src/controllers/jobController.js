import { query } from '../config/database.js';
import { JOB_SOURCES, PAGINATION } from '../config/constants.js';

const normalizeArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  return String(val).split(',');
};
const JOB_TYPE_MAP = {
  'full-time': ['regular', 'full time', 'permanent'],
  'internship': ['intern', 'internship'],
  'contract': ['contract'],
  'part-time': ['part time', 'part-time']
};



export const createJob = async (req, res, next) => {
  try {
    const { title, description, location, salary, skills, jobType } = req.body;
    const userId = req.user.id;
    
    const companyResult = await query(
      'SELECT id FROM companies WHERE user_id = $1',
      [userId]
    );
    
    if (companyResult.rows.length === 0) {
      return res.status(400).json({ message: 'Company profile not set up' });
    }
    
    const companyId = companyResult.rows[0].id;
    
    const result = await query(
      'INSERT INTO jobs (company_id, title, description, location, salary, job_type, source, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *',
      [companyId, title, description, location, salary, jobType, JOB_SOURCES.DIRECT, 'active']
    );
    
    if (skills && skills.length > 0) {
      for (const skill of skills) {
        await query(
          'INSERT INTO job_skills (job_id, skill) VALUES ($1, $2)',
          [result.rows[0].id, skill]
        );
      }
    }
    
    res.status(201).json({
      message: 'Job posted successfully',
      job: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search,
    jobType,
    location,
    datePosted
  } = req.query;

  const jobTypes = normalizeArray(jobType);
  const locations = normalizeArray(location);

  const values = [];
  let where = `WHERE status = 'active'`;

  if (search) {
    values.push(`%${search}%`);
    where += `
      AND (
        title ILIKE $${values.length}
        OR company_name ILIKE $${values.length}
        OR location ILIKE $${values.length}
      )
    `;
  }

  if (jobTypes.length) {
  const normalized = jobTypes.map(t => t.toLowerCase());

  const mappedTypes = normalized.flatMap(t => JOB_TYPE_MAP[t] || []);

  if (mappedTypes.length) {
    values.push(mappedTypes);
    where += `
      AND LOWER(job_type) = ANY($${values.length})
    `;
  }
}


  if (locations.length) {
  const clauses = [];

  locations.forEach(loc => {
    if (loc === 'Remote') {
      clauses.push(`location ILIKE '%remote%'`);
    }
    if (loc === 'On-site') {
      clauses.push(`location NOT ILIKE '%remote%'`);
    }
    if (loc === 'Hybrid') {
      clauses.push(`location ILIKE '%hybrid%'`);
    }
  });

  if (clauses.length) {
    where += ` AND (${clauses.join(' OR ')})`;
  }
}


  if (datePosted) {
    const map = { '24h': '1 day', '7d': '7 days', '30d': '30 days' };
    if (map[datePosted]) {
      where += ` AND created_at >= NOW() - INTERVAL '${map[datePosted]}'`;
    }
  }

  values.push(limit);
  values.push((page - 1) * limit);

  const sql = `
    SELECT *
    FROM jobs
    ${where}
    ORDER BY created_at DESC
    LIMIT $${values.length - 1}
    OFFSET $${values.length}
  `;

  const result = await query(sql, values);
  res.json({ jobs: result.rows });
};






export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'SELECT j.*, c.name as company_name, c.logo_url, c.website FROM jobs j JOIN companies c ON j.company_id = c.id WHERE j.id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    const skillsResult = await query('SELECT skill FROM job_skills WHERE job_id = $1', [id]);
    
    const job = result.rows[0];
    job.skills = skillsResult.rows.map(r => r.skill);
    
    res.json({ job });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const jobResult = await query(
      'SELECT j.* FROM jobs j JOIN companies c ON j.company_id = c.id WHERE j.id = $1 AND c.user_id = $2',
      [id, userId]
    );
    
    if (jobResult.rows.length === 0) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await query('UPDATE jobs SET status = \'inactive\' WHERE id = $1', [id]);
    
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    next(error);
  }
};
