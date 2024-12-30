import express from "express";

const test = (req, res) => {
    res.send("Test");
}

const dummyRouter = express.Router();
dummyRouter.get("/", test);


export default dummyRouter;
