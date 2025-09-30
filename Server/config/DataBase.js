const mongoose = require('mongoose');

const ConnectDatabase = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log("Database Connected");
    }

    catch (err) {
        console.log("Database Error", err.message);
    }
}

module.exports = ConnectDatabase;