const User = require("./user");
const Subscription = require("./subscription");

Subscription.hasMany(User);
User.belongsTo(Subscription);
