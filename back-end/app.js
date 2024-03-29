const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Thing = require("./models/thing");
const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

require("dotenv").config();

mongoose
  .connect(process.env.MONGOOSE, {
    // lien avec fichier .env
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

// Toutes routes non déclaré
app.use("*", (req, res) => {
  res.json({ error: "la route n'existe pas" }); // res.sendStatus(404)
});

module.exports = app;
