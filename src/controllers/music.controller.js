import jwt from "jsonwebtoken";
import uploadFile from "../services/storage.js";
import Music from "../models/music.model.js";
import Album from "../models/album.model.js";

//create music
export const createMusic = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;
    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await Music.create({
      uri: result.url,
      title,
      artist: req.user.id,
    });

    return res.status(201).json({
      message: "Music created successfully",
      music,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//create album

export const createAlbum = async (req, res) => {
  try {
    const { title, musics } = req.body;

    const album = await Album.create({
      title,
      artist: req.user.id,
      musics: musics,
    });

    return res.status(201).json({
      message: "Album created successfully",
      album,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

//get music

export const getAllMusics = async (req, res) => {
  const musics = await Music.find().populate("artist", "userName email");
  res.status(200).json({
    message: "Musics fetched successfully",
    musics,
  });
};

//get all albums

export const getAllAlbums = async (req, res) => {
  const albums = await Album.find()
    .select("title artist ")
    .populate("artist", "userName email");
  res.status(200).json({
    message: "Albums fetched successfully",
    albums,
  });
};

//get album by id
export const getAlbumById = async (req, res) => {
  const albumId = req.params.albumId;

  const album = await Album.findById(albumId).populate(
    "artist",
    "userName email",
  );

  return res.status(200).json({
    message: "Album fetched successfully",
    album,
  });
};
