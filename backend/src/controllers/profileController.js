import { query } from '../config/database.js';

/* =========================
   TALENT PROFILE (GET)
========================= */
export const getTalentProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const profileResult = await query(
      `
      SELECT
        p.*,
        p.resume_url,
        p.profile_picture_url
      FROM profiles p
      WHERE p.user_id = $1
      `,
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
    profile.resume = profile.resume_url;

    res.json({ profile });
  } catch (error) {
    next(error);
  }
};

/* =========================
   TALENT PROFILE (UPDATE)
========================= */
export const updateTalentProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bio, headline, location, skills, availability, phoneNumber } = req.body;

    await query(
      `
      UPDATE profiles SET
        bio = $1,
        headline = $2,
        location = $3,
        availability = $4,
        phone_number = $5,
        updated_at = NOW()
      WHERE user_id = $6
      `,
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

    // mark onboarding complete (safe idempotent update)
    await query(
      'UPDATE users SET is_onboarded = TRUE WHERE id = $1',
      [userId]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    next(error);
  }
};

/* =========================
   TALENT PROFILE (CREATE / ONBOARD)
========================= */
export const createTalentProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const city = req.body.city || null;
    const desiredRole = req.body.desired_role || null;
    const experience = req.body.experience || null;
    const education = req.body.education || null;

    const skills = req.body.skills
      ? Array.isArray(req.body.skills)
        ? req.body.skills
        : [req.body.skills]
      : [];

    const resumeUrl = req.file?.path || null;

    const profileResult = await query(
      `
      INSERT INTO profiles (
        user_id,
        profile_type,
        city,
        desired_role,
        experience,
        education,
        resume_url,
        updated_at
      )
      VALUES ($1, 'talent', $2, $3, $4, $5, $6, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET
        city = EXCLUDED.city,
        desired_role = EXCLUDED.desired_role,
        experience = EXCLUDED.experience,
        education = EXCLUDED.education,
        resume_url = COALESCE(EXCLUDED.resume_url, profiles.resume_url),
        updated_at = NOW()
      RETURNING *;
      `,
      [
        userId,
        city,
        desiredRole,
        experience,
        education,
        resumeUrl
      ]
    );

    if (skills.length) {
      await query('DELETE FROM talent_skills WHERE user_id = $1', [userId]);

      for (const skill of skills) {
        await query(
          'INSERT INTO talent_skills (user_id, skill, verified) VALUES ($1, $2, false)',
          [userId, skill]
        );
      }
    }

    await query(
      'UPDATE users SET is_onboarded = TRUE WHERE id = $1',
      [userId]
    );

    const userResult = await query(
      'SELECT id, email, role, is_onboarded FROM users WHERE id = $1',
      [userId]
    );

    return res.status(200).json({
      profile: {
        ...profileResult.rows[0],
        resume: profileResult.rows[0].resume_url
      },
      user: {
        id: userResult.rows[0].id,
        email: userResult.rows[0].email,
        role: userResult.rows[0].role,
        isOnboarded: userResult.rows[0].is_onboarded
      }
    });
  } catch (error) {
    console.error('❌ Talent onboarding failed:', error);
    return res.status(500).json({ message: 'Failed to complete onboarding' });
  }
};

/* =========================
   UPLOAD PROFILE PHOTO
========================= */
export const uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.id;
    const photoUrl = req.file?.path;

    if (!photoUrl) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }

    await query(
      'UPDATE profiles SET profile_picture_url = $1, updated_at = NOW() WHERE user_id = $2',
      [photoUrl, userId]
    );

    res.json({
      message: 'Profile photo updated',
      profile_picture_url: photoUrl
    });
  } catch (error) {
    console.error('❌ Photo upload failed:', error);
    res.status(500).json({ message: 'Photo upload failed' });
  }
};

/* =========================
   UPLOAD RESUME
========================= */
export const uploadResume = async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeUrl = req.file?.path;

    if (!resumeUrl) {
      return res.status(400).json({ message: 'No resume uploaded' });
    }

    const result = await query(
      `
      UPDATE profiles
      SET resume_url = $1,
          updated_at = NOW()
      WHERE user_id = $2
      RETURNING resume_url
      `,
      [resumeUrl, userId]
    );

    res.json({
      resume: result.rows[0].resume_url
    });
  } catch (error) {
    console.error('❌ Resume upload failed:', error);
    res.status(500).json({ message: 'Resume upload failed' });
  }
};

/* =========================
   COMPANY PROFILE (GET)
========================= */
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

/* =========================
   COMPANY PROFILE (CREATE)
========================= */
export const createCompanyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, website, description, industry, size, location } = req.body;

    const result = await query(
      `
      INSERT INTO companies (
        user_id,
        name,
        website,
        description,
        industry,
        company_size,
        location,
        verified,
        created_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,false,NOW())
      RETURNING *
      `,
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

/* =========================
   COMPANY PROFILE (UPDATE)
========================= */
export const updateCompanyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, website, description, industry, size, location } = req.body;

    const result = await query(
      `
      UPDATE companies SET
        name = $1,
        website = $2,
        description = $3,
        industry = $4,
        company_size = $5,
        location = $6,
        updated_at = NOW()
      WHERE user_id = $7
      RETURNING *
      `,
      [name, website, description, industry, size, location, userId]
    );

    if (!result.rows.length) {
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
