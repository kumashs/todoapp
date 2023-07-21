const mongoose = require("mongoose");

const dbCreds = {
    userName: "",
    userSecret: "",
    database: "todoapp",
    access: "readWrite",
    applicationId: "t001",
};

const mongoUri = 'mongodb://127.0.0.1:27017/' + dbCreds.database;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

// Add event listeners for connection events
connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

connection.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
});

connection.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
});

const schema = mongoose.Schema({}, { strict: false });

module.exports = connection.model("users", schema, "users");
