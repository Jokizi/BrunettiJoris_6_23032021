const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const stuffCtrl = require("../controllers/sauces");

router.get("/", auth, stuffCtrl.getAllSauces);
router.post("/", auth, multer, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, multer, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);
router.post("/:id/like", auth, stuffCtrl.likeDislike);

module.exports = router;
