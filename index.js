const express = require('express');
require('express-async-errors');
const Authrouter = require('./src/application/routes/AuthRoutes.js');
const VehicleService = require('./src/application/services/VehicleService.js');
const VehicleRouter = require('./src/application/routes/VehicleRoutes.js');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/auth', Authrouter)
app.use('/vehicle', VehicleRouter)

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log(err)

  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
