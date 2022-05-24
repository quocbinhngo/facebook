const express = require("express");

const {
  httpRegisterNewAccount,
  httpActivateNewAccount,
  httpLoginToAccount,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/register", httpRegisterNewAccount);
router.post("/activate", httpActivateNewAccount);
router.post("/login", httpLoginToAccount);

module.exports = router;
