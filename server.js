import db from "./db/connection.js";
import routes from "./routes/index.js";

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", routes);

db.on("connected", () => {
    console.clear();
    app.listen(PORT, () => {
        console.log("Express server running on port " + PORT);
    });
});
