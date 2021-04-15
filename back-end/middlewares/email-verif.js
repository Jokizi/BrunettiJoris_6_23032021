const emailValidator = require("email-validator");

// validation champs email via 'npm email-validator'

module.exports = (req, res, next) => {
  console.log("---------------email---------------------");
  console.log(req.body.email);
  console.log("------------------------------------");
  if (!emailValidator.validate(req.body.email)) {
    res.writeHead(400, '{"message":"Mauvaise saisie !"}', {
      "content-type": "application/json",
    });
    res.end('{"message":"Renseigner une adresse mail valide"}', {
      "content-type": "application/json",
    });
  } else {
    next();
  }
};
