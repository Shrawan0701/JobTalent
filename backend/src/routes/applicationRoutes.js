import express from 'express';
import * as applicationController from '../controllers/applicationController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { USER_ROLES } from '../config/constants.js';

const router = express.Router();

router.post('/', authMiddleware, requireRole([USER_ROLES.TALENT]), applicationController.applyToJob);
router.get('/my', authMiddleware, requireRole([USER_ROLES.TALENT]), applicationController.getMyApplications);
router.get('/job/:jobId', authMiddleware, requireRole([USER_ROLES.EMPLOYER]), applicationController.getApplicationsForJob);
router.put('/:applicationId', authMiddleware, requireRole([USER_ROLES.EMPLOYER]), applicationController.updateApplicationStatus);

export default router;
