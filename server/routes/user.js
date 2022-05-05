import express from "express";
const router = express.Router();

import { signin, signup, signupGoogle } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signupGoogle", signupGoogle);

export default router;