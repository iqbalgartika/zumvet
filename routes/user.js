const express = require("express");
const { body } = require("express-validator");

const userController = require("../controllers/user");
const isAuth = require("../middlewares/is-auth");
const isValid = require("../middlewares/is-valid");
const User = require("../models/db/user");

const router = express.Router();

router.post(
  "/signup",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .custom((value, { req }) => {
        return User.findOne({ where: { username: value } }).then((user) => {
          if (user) {
            return Promise.reject("Username already exists!");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
  ],
  isValid,
  userController.signup
);

router.post(
  "/login",
  [
    body("username").trim().isLength({ min: 3 }),
    body("password").trim().isLength({ min: 5 }),
  ],
  isValid,
  userController.login
);

router.get("/subs", isAuth, userController.getSubscribtion);

module.exports = router;
