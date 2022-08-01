import mongoose from "mongoose"

const Schema = mongoose.Schema;

const User = new Schema({
    "Email": { type: String },
    "Full_Name": { type: String },
    "Username": { type: String },
    "Password": { type: String }
}, {timestamps: true})

export default mongoose.model("Users", User);
