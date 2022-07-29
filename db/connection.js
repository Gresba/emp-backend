import mongoose from "mongoose"

const mConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connectionString = process.env.DB_URL || "mongodb://localhost:27017/empgroupproject"

mongoose.connect(connectionString, mConfig);

let db = mongoose.connection;

db.on("connected", () => console.log("Connected to EmpGroupProject"));
db.on("disconnected", () => console.log("Disconnected from the database"));
db.on("error", (err) => console.error(err));

export default db;
