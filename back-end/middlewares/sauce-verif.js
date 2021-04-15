const validate = require("mongoose-validator");

const regexValidate = /^[ A-Za-z0-9_@./'à#&+-]*$/i;

exports.nameChecker = [
  validate({
    validator: "isLength",
    arguments: [2, 30],
    message: "Votre sauce doit comprendre un nom de 2 à 30 caractères",
  }),
  validate({
    validator: "matches",
    arguments: regexValidate,
    message:
      "Vous pouvez utiliser des lettres, chiffres, majuscules, minuscules et caractères spéciaux",
  }),
];

exports.manufacturerChecker = [
  validate({
    validator: "isLength",
    arguments: [2, 30],
    message: "Le producteur doit avoir un nom de 2 à 30 caractères",
  }),
  validate({
    validator: "matches",
    arguments: regexValidate,
    message:
      "Vous pouvez utiliser des lettres, chiffres, majuscules, minuscules et caractères spéciaux",
  }),
];

exports.descriptionChecker = [
  validate({
    validator: "isLength",
    arguments: [5, 250],
    message:
      "La description du produit doit être comprise entres 5 et 250 caractères",
  }),
  validate({
    validator: "matches",
    arguments: regexValidate,
    message:
      "Vous pouvez utiliser des lettres, chiffres, majuscules, minuscules et caractères spéciaux",
  }),
];

exports.ingredientChecker = [
  validate({
    validator: "isLength",
    arguments: [2, 2],
    message:
      "l'ingrédient du produit doit comporter entres 2 et 200 caractères",
  }),
  validate({
    validator: "matches",
    arguments: regexValidate,
    message:
      "Vous pouvez utiliser des lettres, chiffres, majuscules, minuscules et caractères spéciaux",
  }),
];

exports.heatChecker = [
  validate({
    validator: "isLength",
    arguments: [1, 10],
    message: "La notation va de 1 à 10",
  }),
  validate({
    validator: "matches",
    arguments: /^[1-10]+$/i,
    message: "La notation va de 1 à 10",
  }),
];
