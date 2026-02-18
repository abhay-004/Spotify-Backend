import jwt from "jsonwebtoken";
import uploadFile from "../services/storage.js";
import Music from "../models/music.model.js";

//create music
export const createMusic = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res
        .status(401)
        .json({ message: "You don't have access to create an music" });
    }

    const { title } = req.body;
    const file = req.file;
    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await Music.create({
      uri: result.url,
      title,
      artist: decoded.id,
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
