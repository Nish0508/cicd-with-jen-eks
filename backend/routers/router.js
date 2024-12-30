import express from "express";

import authRouter from "./authRouter.js";
import dummyRouter from "./dummyRouter.js";


const router = express.Router();

router.use("/auth", authRouter);
router.use("/test", dummyRouter);
export { router };
