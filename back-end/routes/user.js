const express = require("express");
const router = express.Router();
const emailVerif = require("../middlewares/email-verif");
const passwordVerif = require("../middlewares/password-verif");
const userCtrl = require("../controllers/user");

router.post("/signup", emailVerif, passwordVerif, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
