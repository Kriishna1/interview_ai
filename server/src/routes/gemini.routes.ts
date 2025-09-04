import {
  GenerateIntervieQuestions,
  GenerateReview,
} from "../controllers/gemini.controllers";
import authMiddleware from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { Router } from "express";
const router = Router();

// Generate Questions
// router.post("/generatedsa",asyncHandler(authMiddleware),asyncHandler(GenerateDSAQuestions));
// router.post("/generatecore",asyncHandler(authMiddleware),asyncHandler(GenerateCoreSubjectQuestions));
// router.post("/generatecore",asyncHandler(authMiddleware),asyncHandler(GenerateCoreSubjectQuestions));

router.post(
  "/generatequestions",
  asyncHandler(authMiddleware),
  asyncHandler(GenerateIntervieQuestions)
);

// Review
router.post(
  "/generatereview",
  asyncHandler(authMiddleware),
  asyncHandler(GenerateReview)
);
export default router;
