import express from "express";
import {
  signin
} from "../handlers/authHandlers.js";

const authRouter = express.Router();
authRouter.post("/signin", signin);


export default authRouter;
