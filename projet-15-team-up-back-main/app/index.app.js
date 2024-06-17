import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import router from "./routers/index.router.js";
import swaggerMiddleware from "./middlewares/swagger.middleware.js";

const app = express();
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

// Configuration CORS pour limiter l'accès à l'application front
const corsOptions = {
  origin: "http://localhost:5173"
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "10mb" })); // Limite de taille pour les données JSON
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" })); // Limite de taille pour les données URL encodées

swaggerMiddleware(app);

app.use(router);

export default app;
