import express from "express";
import {
  createAlbum,
  createMusic,
  getAllAlbums,
  getAllMusics,
  getAlbumById,
} from "../controllers/music.controller.js";
import multer from "multer";
import { authArtist, authUser } from "../middlewares/auth.middleware.js";
const musicRouter = express.Router();

//multer
const upload = multer({
  storage: multer.memoryStorage(),
});
//routes

musicRouter.post("/upload", authArtist, upload.single("music"), createMusic);
musicRouter.post("/album", authArtist, createAlbum);
musicRouter.get("/", authUser, getAllMusics);
musicRouter.get("/albums", authUser, getAllAlbums);
musicRouter.get("/album/:albumId", authUser, getAlbumById);

export default musicRouter;
