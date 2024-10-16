require('express-async-errors');

const express = require('express');
const Authrouter = require('./src/application/routes/AuthRoutes.js');
const VehicleRouter = require('./src/application/routes/VehicleRoutes.js');
const authenticateRequest = require('./src/application/middlewares/authenticateRequest.js');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(authenticateRequest)

app.use('/auth', Authrouter)
app.use('/vehicle', VehicleRouter)
app.get('/', (req, res) => {
  return res.status(200).json({
    message: 'Hello world'
  })
})

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

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
