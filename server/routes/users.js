import express from 'express';

import { signin , signup } from "../controllers/user.js"

const router = express.Router();

router.post("/signin" , signin)// backend'e data göndermemiz gerekir formdaki bilgiler gider
router.post("/signup" , signup)


export default router;