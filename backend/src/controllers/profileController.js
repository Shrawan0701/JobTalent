import { query } from '../config/database.js';

export const getTalentProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const profileResult = await query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [userId]
    );
    
    if (profileResult.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    const skillsResult = await query(
      'SELECT skill FROM talent_skills WHERE user_id = $1',
      [userId]
    );
    
    const profile = profileResult.rows[0];
    profile.skills = skillsResult.rows.map(r => r.skill);
    
    res.json({ profile });
  } catch (error) {
    next(error);
  }
};

export const updateTalentProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bio, headline, location, skills, availability, phoneNumber } = req.body;
    
    await query(
      'UPDATE profiles SET bio = $1, headline = $2, location = $3, availability = $4, phone_number = $5, updated_at = NOW() WHERE user_id = $6',
      [bio, headline, location, availability, phoneNumber, userId]
    );
    
    if (skills && Array.isArray(skills)) {
      await query('DELETE FROM talent_skills WHERE user_id = $1', [userId]);
      
      for (const skill of skills) {
        await query(
          'INSERT INTO talent_skills (user_id, skill, verified) VALUES ($1, $2, false)',
          [userId, skill]
        );
      }
    }
    
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const getCompanyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    
    const result = await query(
      'SELECT * FROM companies WHERE user_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json({ company: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const createCompanyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, website, description, industry, size, location } = req.body;
    
    const result = await query(
      'INSERT INTO companies (user_id, name, website, description, industry, company_size, location, verified, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, false, NOW()) RETURNING *',
      [userId, name, website, description, industry, size, location]
    );
    
    res.status(201).json({
      message: 'Company profile created',
      company: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompanyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, website, description, industry, size, location } = req.body;
    
    const result = await query(
      'UPDATE companies SET name = $1, website = $2, description = $3, industry = $4, company_size = $5, location = $6, updated_at = NOW() WHERE user_id = $7 RETURNING *',
      [name, website, description, industry, size, location, userId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }
    
    res.json({
      message: 'Company updated successfully',
      company: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
