import express from 'express';
import * as jobController from '../controllers/jobController.js';
import { authMiddleware, requireRole, optionalAuth } from '../middleware/auth.js';
import { USER_ROLES } from '../config/constants.js';

const router = express.Router();

router.post('/', authMiddleware, requireRole([USER_ROLES.EMPLOYER]), jobController.createJob);
router.get('/', optionalAuth, jobController.getJobs);
router.get('/:id', jobController.getJobById);
router.delete('/:id', authMiddleware, requireRole([USER_ROLES.EMPLOYER]), jobController.deleteJob);

export default router;
