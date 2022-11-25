const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const userRoutes = require("./routes/user");
const subscriptionRoutes = require("./routes/subscription");
app.use("/user", userRoutes);
app.use("/subs", subscriptionRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const data = error.data;
    const message = error.message;
    return res.status(status).json({ message: message, data: data });
})

require("./models/db/relations");
sequelize
//   .sync({ force: true })
  .sync()
  .then((user) => app.listen(3000))
  .catch((err) => console.log(err));
