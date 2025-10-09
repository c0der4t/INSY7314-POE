const express = require('express');
require('dotenv').config();
const { connectToMongo } = require('./services/dbService.js');
const { securityMiddlewares } = require('./middlewares/securityMiddleware.js');

const http = require('http');
const https = require('https')
const fs = require('fs');

//create new variables to hold where cert lives
// const options = {
//     key: fs.readFileSync('./certs/localhost+1-key.pem'),
//     cert: fs.readFileSync('./certs/localhost+1.pem'),
// }

const utilityRoutes = require('./routes/utilityRoutes.js');
const authRoutes = require('./routes/authRoutes.js');

const app = express();

app.use(express.json());


securityMiddlewares(app);


app.use((req, res, next) => {

    // TODO: Remove the excess logging
    console.log(`${req.method} ${req.url}`)
    next();
});


app.use('/v1/utility', utilityRoutes);
app.use('./v1/auth', authRoutes);

const port = process.env.API_PORT || 3000
connectToMongo();


//app.listen(port, () => {
//    console.log(`The API is now listening on port ${port}.`)
//});

//we are using the https library to create a secure listener, it takes in the options created before, then 
//tell it that we want to run our express aoo, what port and what to print out
// https.createServer(options, app).listen(port, () => {
//     console.log(`The API is now securely listening on port we set.`)
// })

http.createServer(app).listen(port, () => {
    console.log(`The API is now listening (HTTP) on port ${port}`)
  })
  