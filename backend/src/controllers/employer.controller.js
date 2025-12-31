import { query } from '../config/database.js';

export const saveEmployerProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    name,
    website,
    description,
    industry,
    company_size,
    location,
    logo_url
  } = req.body;

  try {
    const result = await query(
      `
      INSERT INTO companies (user_id, name, website, description, industry, company_size, location, logo_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      ON CONFLICT (user_id)
      DO UPDATE SET
        name = EXCLUDED.name,
        website = EXCLUDED.website,
        description = EXCLUDED.description,
        industry = EXCLUDED.industry,
        company_size = EXCLUDED.company_size,
        location = EXCLUDED.location,
        logo_url = EXCLUDED.logo_url,
        updated_at = NOW()
      RETURNING *;
      `,
      [
        userId,
        name,
        website,
        description,
        industry,
        company_size,
        location,
        logo_url
      ]
    );

    res.json({
      data: result.rows[0]   // 🔥 THIS IS CRITICAL
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save employer profile' });
  }
};

export const getEmployerProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await query(
      `SELECT * FROM companies WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json({ data: null });
    }

    res.json({
      data: result.rows[0]   // 🔥 THIS IS WHAT FRONTEND NEEDS
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch employer profile' });
  }
};

export const updateEmployerProfile = async (req, res) => {
  const userId = req.user.id;
  const {
    name, website, description,
    industry, company_size, location, logo_url
  } = req.body;

  const result = await query(
    `UPDATE companies SET
      name=$1, website=$2, description=$3,
      industry=$4, company_size=$5,
      location=$6, logo_url=$7,
      updated_at=NOW()
     WHERE user_id=$8
     RETURNING *`,
    [
      name, website, description,
      industry, company_size,
      location, logo_url, userId
    ]
  );

  res.json(result.rows[0]);
};
