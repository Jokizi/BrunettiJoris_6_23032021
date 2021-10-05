const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// On définit notre algorithme de cryptage
const algorithm = "aes256";

// Notre clé de chiffrement, elle est souvent générée aléatoirement mais elle doit être la même pour le décryptage
const motDePasse = "l5JmP+G0/1zB%;r8B8?2?2pcqGcL^3";

exports.signup = (req, res, next) => {
  // On crypte notre texte
  let cipher = crypto.createCipheriv(algorithm, motDePasse);

  let crypted = cipher.update(req.body.email, "utf8", "hex");
  crypted += cipher.final("hex");

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: crypted,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => {});
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  let cipher = crypto.createCipheriv(algorithm, motDePasse);

  let crypted = cipher.update(req.body.email, "utf8", "hex");
  crypted += cipher.final("hex");

  let decipher = crypto.createDecipheriv(algorithm, motDePasse);
  let dec = decipher.update(crypted, "hex", "utf8");
  dec += decipher.final("utf8");

  User.findOne({ email: crypted })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "email et ou mot de passe incorrect !" });
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "email et ou mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "drxyctfugvhbujik84hf!!", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
