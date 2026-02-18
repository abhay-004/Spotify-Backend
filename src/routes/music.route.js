import express from "express";
import { createMusic } from "../controllers/music.controller.js";
import multer from "multer";
const musicRouter = express.Router();

//multer
const upload = multer({
  storage: multer.memoryStorage(),
});
//routes

musicRouter.post("/upload", upload.single("music"), createMusic);

export default musicRouter;
