import express from 'express';
import * as profileController from '../controllers/profileController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { USER_ROLES } from '../config/constants.js';
import upload from '../middleware/upload.js';
import uploadPhoto from '../middleware/uploadPhoto.js';

const router = express.Router();

/* ========= TALENT ========= */

// CREATE / UPDATE TALENT PROFILE (ONBOARDING)
router.post(
  '/talent',
  authMiddleware,
  requireRole([USER_ROLES.TALENT]),
  upload.single('resume'),
  profileController.createTalentProfile
);

// UPLOAD RESUME (AFTER ONBOARDING)
router.post(
  '/resume',
  authMiddleware,
  requireRole([USER_ROLES.TALENT]),
  upload.single('resume'),
  profileController.uploadResume
);

// GET TALENT PROFILE
router.get(
  '/talent',
  authMiddleware,
  requireRole([USER_ROLES.TALENT]),
  profileController.getTalentProfile
);

// UPDATE TALENT PROFILE
router.put(
  '/talent',
  authMiddleware,
  requireRole([USER_ROLES.TALENT]),
  profileController.updateTalentProfile
);

/* ========= COMPANY ========= */

// CREATE COMPANY PROFILE
router.post(
  '/company',
  authMiddleware,
  requireRole([USER_ROLES.EMPLOYER]),
  profileController.createCompanyProfile
);

// GET COMPANY PROFILE
router.get(
  '/company',
  authMiddleware,
  requireRole([USER_ROLES.EMPLOYER]),
  profileController.getCompanyProfile
);

// UPDATE COMPANY PROFILE
router.put(
  '/company',
  authMiddleware,
  requireRole([USER_ROLES.EMPLOYER]),
  profileController.updateCompanyProfile
);

// UPLOAD PROFILE PHOTO (TALENT)
router.post(
  '/photo',
  authMiddleware,
  requireRole([USER_ROLES.TALENT]),
  uploadPhoto.single('photo'),
  profileController.uploadProfilePhoto
);

export default router;
