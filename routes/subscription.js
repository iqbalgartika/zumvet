const express = require("express");
const { param, body } = require("express-validator");

const subsController = require("../controllers/subscription");
const isAuth = require("../middlewares/is-auth");
const isValid = require("../middlewares/is-valid");
const Subscription = require("../models/db/subscription");

const router = express.Router();

router.get("/", subsController.getSubscriptions);

router.post(
  "/add",
  [body("name").trim().isLength({ min: 3 }), body("cost").isFloat({ min: 0 })],
  isAuth,
  isValid,
  subsController.addSubscription
);

router.post(
  "/purchase/:subsId",
  [
    param("subsId").custom((value, { req }) => {
      return Subscription.findByPk(value).then((subs) => {
        if (!subs) {
          return Promise.reject("Subscription doesnt exist!");
        }
      });
    }),
  ],
  isValid,
  isAuth,
  subsController.purchaseSubscribe
);

router.get("/unsubscribe", isAuth, subsController.unsubscribe);

module.exports = router;
