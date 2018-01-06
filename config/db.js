const mongoose = require('mongoose');
const config = require('./config');

mongoose.set('debug', true);

const dbPort = config.dbUrl;

mongoose.connect(dbPort, error => {
    if (error) {
        throw error;
    }

    console.log('MongoDB has been successfully connected')
});

process.on('SIGINT', () => {
    mongoose.disconnect()
        .then(() => {
            console.log('Disconnected');
            process.exit();
        });
});

module.exports = mongoose;