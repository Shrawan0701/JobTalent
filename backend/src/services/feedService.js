import { query } from '../config/database.js';

export const getFeedJobs = async () => {
  const sql = `
    SELECT
      j.id,
      j.title,
      j.location,
      j.salary,
      j.description,
      j.apply_url,
      j.source,
      COALESCE(c.name, j.company_name) AS company_name,
      c.logo_url,
      j.created_at
    FROM jobs j
    LEFT JOIN companies c ON j.company_id = c.id
    WHERE j.status = 'active'
    ORDER BY j.created_at DESC
    LIMIT 50
  `;

  const result = await query(sql);
  return result.rows;
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
