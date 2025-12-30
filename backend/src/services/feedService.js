import { query } from '../config/database.js';

export const getJobs = async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search,
    jobType,
    location,
    datePosted
  } = req.query;

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

  if (jobType) {
    values.push(jobType);
    where += ` AND job_type = ANY($${values.length})`;
  }

  if (location) {
    where += ` AND location ILIKE '%${location}%'`;
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





export const getRecommendedJobs = async (userId) => {
  try {
    const skillsResult = await query(
      'SELECT skill FROM talent_skills WHERE user_id = $1',
      [userId]
    );
    
    const skills = skillsResult.rows.map(r => r.skill);
    
    const profileResult = await query(
      'SELECT location FROM profiles WHERE user_id = $1',
      [userId]
    );
    
    const location = profileResult.rows[0]?.location || '%';
    
    return getFeedJobs(userId, location, skills);
  } catch (error) {
    console.error('Recommendation error:', error);
    throw error;
  }
};
