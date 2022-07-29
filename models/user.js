import mongoose from "mongoose"

const Schema = mongoose.Schema;

const User = new Schema({
    "Email": { type: String },
    "Full Name": { type: String },
    "Username": { type: String },
    "Password_Digest": { type: String }
}, {timestamps: true})

export default mongoose.model("Users", User);
