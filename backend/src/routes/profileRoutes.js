import express from 'express';
import * as profileController from '../controllers/profileController.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';
import { USER_ROLES } from '../config/constants.js';

const router = express.Router();

router.get('/talent', authMiddleware, requireRole([USER_ROLES.TALENT]), profileController.getTalentProfile);
router.put('/talent', authMiddleware, requireRole([USER_ROLES.TALENT]), profileController.updateTalentProfile);
router.get('/company', authMiddleware, requireRole([USER_ROLES.EMPLOYER]), profileController.getCompanyProfile);
router.post('/company', authMiddleware, requireRole([USER_ROLES.EMPLOYER]), profileController.createCompanyProfile);
router.put('/company', authMiddleware, requireRole([USER_ROLES.EMPLOYER]), profileController.updateCompanyProfile);

export default router;
