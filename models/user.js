const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { DB_JWTSECRET } = require("../util/const");

const User = require("./db/user");

exports.add = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      password: hashedPassword,
      username: username,
    });
    return {
      status: 201,
      data: {
        messasge: `User ${username} has been created!`,
        userId: user.id,
      },
    };
  } catch (error) {
    throw error;
  }
};

exports.login = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      const error = new Error("Incorrect username or password");
      error.statusCode = 401;
      throw error;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const error = new Error("Incorrect username or password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        username: user.username,
        userId: user.id,
      },
      DB_JWTSECRET,
      { expiresIn: "1h" }
    );
    return {
      status: 200,
      data: { userId: user.id, token: token },
    };
  } catch (error) {
    throw error;
  }
};

exports.getSubs = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      const error = new Error(`Couldn't find user with Id: ${userId}`);
      error.statusCode = 404;
      throw error;
    }
    const subs = await user.getSubscription();
    return {
      status: 200,
      data: { userId: userId, subscription: subs },
    };
  } catch (error) {
    throw error;
  }
};
