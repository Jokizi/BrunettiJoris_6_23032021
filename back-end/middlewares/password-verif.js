const passwordSchema = require("../models/password");

// application du schéma password
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.writeHead(
      400,
      '{"message":"Mot de passe incorrect : doit contenir au minimum 8 caractères, 1 Majuscule, 1 minuscule, 2 chiffres, sans espace !"}',
      {
        "content-type": "application/json",
      }
    );
    res.end('{"message":"Mauvaise saisie !"}', {
      "content-type": "application/json",
    });
  } else {
    next();
  }
};
