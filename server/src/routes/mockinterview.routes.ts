import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createMockInterview,
  getMockInterviews,
  getMockInterviewById,
  editMockInterview,
  deleteMockInterview,
} from "../controllers/mockinterview.conrollers";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/create",
  asyncHandler(authMiddleware),
  asyncHandler(createMockInterview)
);
router.get("/", asyncHandler(authMiddleware), getMockInterviews);
router.get(
  "/:id",
  asyncHandler(authMiddleware),
  asyncHandler(getMockInterviewById)
);
router.put(
  "/edit/:id",
  asyncHandler(authMiddleware),
  asyncHandler(editMockInterview)
);
router.delete(
  "/delete/:id",
  asyncHandler(authMiddleware),
  asyncHandler(deleteMockInterview)
);

export default router;
