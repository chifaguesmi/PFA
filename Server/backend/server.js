// server.js   ←←← UN SEUL FICHIER, TOUT EST ICI
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./database/mongo.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // charge .env

const app = express();

// ──────── Middleware ────────
app.use(express.json());
app.use(cookieParser());

// ──────── Routes ────────
app.use("/api/auth", authRoutes);

// Route de test rapide
app.get("/", (req, res) => {
  res.send("Delivery App Backend is ALIVE");
});

// ──────── Démarrage ────────
const PORT = process.env.PORT || 5000;

connectDB() // connexion MongoDB
  .then(() => {
    // ← on attend que Mongo soit connecté avant de lancer le serveur
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    })
    })
  .catch((err) => {
    console.error("Impossible de connecter MongoDB :", err.message);
    process.exit(1);
  });