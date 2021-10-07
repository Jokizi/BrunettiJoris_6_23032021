const express = require("express");
const router = express.Router();
const emailVerif = require("../middlewares/email-verif");
const passwordVerif = require("../middlewares/password-verif");
const userCtrl = require("../controllers/user");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 4, // limit each IP to 100 requests per windowMs
});

router.post("/signup", emailVerif, passwordVerif, userCtrl.signup);
router.post("/login", limiter, userCtrl.login);

module.exports = router;
