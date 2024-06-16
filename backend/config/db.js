const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connect_database = async () => {
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
        console.error("DATABASE_URL is not defined in the environment variables.");
        process.exit(1); // Exit the process with failure
    }

    try {
        await mongoose.connect(dbUrl);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connect_database;
