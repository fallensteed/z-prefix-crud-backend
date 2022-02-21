import mongoose from "mongoose";
import "dotenv/config";
import { MONGO_URI, PORT } from "./config";

const app = require("./app");

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("⚡️[server]: MongoDB Connected");

        const server = app.listen(PORT, () =>
            console.log(`⚡️[server]: App listening on PORT ${server.address().port}`),
        );
    } catch (err) {
        console.log(err);
    }
})();
