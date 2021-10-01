const passwordValidator = require("password-validator");

//créer le schéma
const schema = new passwordValidator();

// donner ses propriétés
schema
  .is()
  .min(8) // Minimum 8 caractères
  .is()
  .max(100) // Maximum 100 caractères
  .has()
  .uppercase() // Avoir 1 majuscule
  .has()
  .lowercase() // Avoir 1 minuscule
  .has()
  .digits(2) // Avoir au minimum 2 chiffres
  .has()
  .not()
  .spaces() // Pas d'espace
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist ce type de valeur

module.exports = schema;
