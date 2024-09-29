const mongoose = require('mongoose');
const { config } = require('dotenv');
config();

const mongo_url = process.env.MONGODB_URI;

const connect_to_db = () => {
    mongoose.connect(mongo_url, { maxPoolSize: 10 });

    mongoose.connection.on('connected', () => {
        console.log('connected to the db.')
    });

    mongoose.connection.on('error', (err) => {
        console.log('db connection error :- ', err)
    });

    mongoose.connection.on('disconnected', () => {
        console.log('db is disconnected.');
    });

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('db has been disconnected due to app termination.');
        process.exit(0)
    });
}

module.exports = { connect_to_db };