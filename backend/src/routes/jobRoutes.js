import express from 'express';
import * as jobController from '../controllers/jobController.js';
import { authMiddleware, requireRole, optionalAuth } from '../middleware/auth.js';
import { USER_ROLES } from '../config/constants.js';

const router = express.Router();

// 🔹 Employer / Admin job management
router.post(
  '/',
  authMiddleware,
  requireRole([USER_ROLES.EMPLOYER]),
  jobController.createJob
);

// 🔹 PUBLIC TALENT FEED (DB ONLY)
router.get(
  '/feed',
  optionalAuth,
  jobController.getFeedJobs
);

// 🔹 Raw / general jobs (keep this)
router.get(
  '/',
  optionalAuth,
  jobController.getJobs
);

// 🔒 EMPLOYER ONLY - THEIR OWN JOBS
router.get(
  '/employer/my-jobs',
  authMiddleware,
  requireRole([USER_ROLES.EMPLOYER]),
  jobController.getEmployerJobs
);

// 🔹 Job detail
router.get('/:id', jobController.getJobById);

// 🔹 Delete job
router.delete(
  '/:id',
  authMiddleware,
  requireRole([USER_ROLES.EMPLOYER]),
  jobController.deleteJob
);

export default router;
