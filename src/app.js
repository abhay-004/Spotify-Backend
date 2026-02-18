import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import musicRouter from "./routes/music.route.js";

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//route
app.get("/", (req, res) => {
  res.send("Server is running");
});

//api endpoints
app.use("/api/auth", authRouter);
app.use("/api/music", musicRouter);

export default app;
