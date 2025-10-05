
const mongoose = require('mongoose');
require('dotenv').config()


const connectToMongo = async () => {
    try {
        
        console.log("Connecting to the database..." + process.env.CONN_STRING);
        await mongoose.connect(process.env.CONN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to the database successfully.")
    } catch (err) {
        console.error("Unable to connect to the mongo database.")
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = {connectToMongo}
