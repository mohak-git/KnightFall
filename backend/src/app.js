import express from "express";
import cors from "cors";
import userRoute from "./routes/user.routes.js";
import gameRoute from "./routes/game.routes.js";
import cookieParser from "cookie-parser";
import verifyAccessToken from "./middlewares/auth.middleware.js";
import { fileURLToPath } from "url";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "../public")));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
    res.send("Home route active!");
});
app.use("/user", userRoute);
app.use("/game", verifyAccessToken, gameRoute);

app.use(errorHandler);

export default app;
