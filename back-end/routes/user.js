const express = require("express");
const router = express.Router();
const emailVerif = require("../middlewares/email-verif");
const passwordVerif = require("../middlewares/password-verif");
const userCtrl = require("../controllers/user");
const ExpressBrute = require("express-brute");
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);

router.post("/signup", emailVerif, passwordVerif, userCtrl.signup);
router.post("/login", bruteforce.prevent, userCtrl.login);

module.exports = router;
