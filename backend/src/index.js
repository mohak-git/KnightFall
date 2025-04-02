import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import DBConnection from "./config/db.js";
import http from "http";
import app from "./app.js";
import socketConnection from "./config/socket.js";

DBConnection()
    .then(() => {
        const server = http.createServer(app);

        socketConnection(server);

        server.listen(process.env.PORT || 1500, () => {
            console.log(`App listening @ port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error connecting to database!", err.message);
    });
