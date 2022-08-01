import mongoose from "mongoose"

const Schema = mongoose.Schema;

let Picture = new Schema({
    "Artist": { type: String},
    "Title": { type: String },
    "ImageId": { type: String },
    "Year": { type: Number } ,
    "Tags": [{ type: String }],
    "Comments": [{ type: Schema.Types.ObjectId, ref: "Comments" }]
})

export default mongoose.model("pictures", Picture)
