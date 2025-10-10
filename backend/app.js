import rateLimit from 'express-rate-limit';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import https from 'https';
import fs from 'fs';

import { connectToMongo } from './services/dbService.js';
import { securityMiddlewares } from './middlewares/securityMiddleware.js';
import utilityRoutes from './routes/utilityRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Rate limiting - max= number of requests, winodwsMs= period of time resuts are made in
 //Raddy Z, 2022.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 2,
  message: {
    status: 429,
    message: "Too many requests from this IP, please try again later."
  }
});


//create new variables to hold where cert lives
// const options = {
//     key: fs.readFileSync('./certs/localhost+1-key.pem'),
//     cert: fs.readFileSync('./certs/localhost+1.pem'),
// }



const utilityRoutes = require('./routes/utilityRoutes.js');
const authRoutes = require('./routes/authRoutes.js');


app.use('/v1', apiLimiter);




app.use(express.json());


securityMiddlewares(app);


app.use((req, res, next) => {

    console.log(`${req.method} ${req.url}`)
    next();
});


app.use('/v1/utility', utilityRoutes);
app.use('/v1/auth', authRoutes);

const port = process.env.API_PORT || 3001
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
  
  //references:
  //Raddy Z, 2022. NodeJs Limiting Network Traffic - Express, Express Rate Limit. [video] YouTube. Available at: https://www.youtube.com/watch?v=VZZLiVccwKk&t=213s[Accessed 10 October 2025].