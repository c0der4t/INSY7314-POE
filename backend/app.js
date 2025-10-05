const express = require('express');
require('dotenv').config();
const { connectToMongo } = require('./services/dbService.js');
const { securityMiddlewares } = require('./middlewares/securityMiddleware.js');
const utilityRoutes = require('./routes/utilityRoutes.js');
const app = express();

app.use(express.json());


securityMiddlewares(app);


app.use((req, res, next) => {

    // TODO: Remove the excess logging
    console.log(`${req.method} ${req.url}`)
    next();
});


app.use('/v1/utility', utilityRoutes);

const port = process.env.API_PORT || 3000
connectToMongo();


app.listen(port, () => {
    console.log(`The API is now listening on port ${port}.`)
});