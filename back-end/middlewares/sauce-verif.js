// Utilisation du package : mongoose-validator pour vérifier les informations envoyés dans la création et la modification des sauces

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
    arguments: [2, 200],
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
