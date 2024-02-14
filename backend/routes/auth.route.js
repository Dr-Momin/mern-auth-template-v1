import express from "express";
import { signin, signup } from "../controllers/auth.controllers.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("auth api route.");
});

router.post("/signup", signup);
router.post("/signin", signin);

export { router };
