const passwordSchema = require("../models/password");

// application du schéma password
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.writeHead(400);
    res.end(
      '{"message":"Mot de passe incorrect : doit contenir au minimum 8 caractères, 1 Majuscule, 1 minuscule, 2 chiffres, 1 caractère spécial, sans espace !"}'
    );
  } else {
    next();
  }
};
