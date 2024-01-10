const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/* AUTHENTICATE User on POST */
router.post("/login", authController.login);

/* CREATE User on POST */
router.post("/signup", authController.signup);

module.exports = router;
