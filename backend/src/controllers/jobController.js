import { query } from '../config/database.js';
import { JOB_SOURCES, PAGINATION } from '../config/constants.js';

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

export const getJobs = async (req, res, next) => {
  try {
    const { location, page = 1, limit = PAGINATION.DEFAULT_LIMIT, source } = req.query;
    const offset = (page - 1) * limit;

    let sql = `
      SELECT
        j.*,
        COALESCE(c.name, j.company_name) AS company_name,
        c.logo_url
      FROM jobs j
      LEFT JOIN companies c ON j.company_id = c.id
      WHERE j.status = 'active'
    `;
    const params = [];

    if (location) {
      sql += ` AND j.location ILIKE $${params.length + 1}`;
      params.push(`%${location}%`);
    }

    if (source) {
      sql += ` AND j.source = $${params.length + 1}`;
      params.push(source);
    }

    const countResult = await query(
      `SELECT COUNT(*) FROM (${sql}) t`,
      params
    );

    sql += ` ORDER BY j.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await query(sql, params);

    res.json({
      jobs: result.rows,
      pagination: {
        total: parseInt(countResult.rows[0].count),
        page: Number(page),
        limit: Number(limit),
      },
    });
  } catch (error) {
    next(error);
  }
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
