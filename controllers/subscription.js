const subscription = require("../models/subscription");

exports.addSubscription = async (req, res, next) => {
  const name = req.body.name;
  const cost = req.body.cost;

  try {
    const result = await subscription.add(name, cost);
    return res.status(result.status).json({ ...result.data });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

exports.getSubscriptions = async (req, res, next) => {
  try {
    const result = await subscription.getAll();
    return res.status(result.status).json({ ...result.data });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

exports.purchaseSubscribe = async (req, res, next) => {
  const userId = req.userId;
  const subsId = req.params.subsId;

  try {
    const result = await subscription.purchase(userId, subsId);
    return res.status(result.status).json({ ...result.data });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

exports.unsubscribe = async (req, res, next) => {
  const userId = req.userId;

  try {
    const result = await subscription.unsubscribe(userId);
    return res.status(result.status).json({ ...result.data });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};