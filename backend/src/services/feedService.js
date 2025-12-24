import { query } from '../config/database.js';

export const getFeedJobs = async (userId, location, skills, source) => {
  try {
    let sql = `
      SELECT 
        j.*,
        c.name as company_name,
        c.logo_url,
        c.verified,
        (
          SELECT COUNT(*) FROM job_skills 
          WHERE job_id = j.id 
          AND skill = ANY($1)
        ) as skill_match_count,
        CASE 
          WHEN j.source = 'direct' THEN 100
          WHEN j.source = 'admin' THEN 50
          ELSE 0
        END as source_score
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      WHERE j.status = 'active'
    `;
    
    const params = [skills || [], location || '%'];
    
    if (source) {
      sql += ` AND j.source = $${params.length + 1}`;
      params.push(source);
    }
    
    sql += `
      ORDER BY 
        source_score DESC,
        (skill_match_count * 20) DESC,
        j.created_at DESC
      LIMIT 50
    `;
    
    const result = await query(sql, params);
    return result.rows;
  } catch (error) {
    console.error('Feed error:', error);
    throw error;
  }
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
