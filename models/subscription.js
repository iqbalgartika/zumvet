const Subscription = require("../models/db/subscription");
const User = require("../models/db/user");

exports.add = async (name, cost) => {
  try {
    const subs = await Subscription.create({ name, cost });
    return {
      status: 201,
      data: {
        messasge: `Subsciption ${name} has been created!`,
        subsId: subs.id,
      },
    };
  } catch (error) {
    throw error;
  }
};

exports.getAll = async () => {
  try {
    const subsList = await Subscription.findAll();
    return {
      status: 201,
      data: {
        subs: subsList,
      },
    };
  } catch (error) {
    throw error;
  }
};

exports.purchase = async (userId, subsId) => {
  try {
    const user = await User.findByPk(userId);
    if (user.subscriptionId) {
      const error = new Error(
        `User ${user.username} has already subscribed to subscription ${user.subscriptionId}. Unsubscribe first!`
      );
      error.statusCode = 406;
      throw error;
    }
    const result = user.setSubscription(subsId);
    return {
      status: 200,
      data: {
        messasge: `User ${user.username} subscribed to subscription ${subsId}`,
      },
    };
  } catch (error) {
    throw error;
  }
};

exports.unsubscribe = async (userId) => {
    try {
      const user = await User.findByPk(userId);
      const result = user.setSubscription(null);
      return {
        status: 200,
        data: {
          messasge: `User ${user.username} unsubscribed`,
        },
      };
    } catch (error) {
      throw error;
    }
  };
