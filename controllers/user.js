const user = require("../models/user");

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await user.add(username, password);
    return res.status(result.status).json({ ...result.data });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const result = await user.login(username, password);
    return res.status(result.status).json({ ...result.data });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};

exports.getSubscribtion = async (req, res, next) => {
  const userId = req.userId;

  try {
    const result = await user.getSubs(userId);
    return res.status(result.status).json({ ...result.data });
  } catch (error) {
    error.statusCode = error.statusCode || 500;
    next(error);
  }
};
