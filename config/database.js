const mongoose = require("mongoose");
const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("connected", function() {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});
