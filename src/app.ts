import express from "express";
import "dotenv/config";
import cookieSession from "cookie-session";
import { API_PATH, SESS_LIFETIME, SESS_NAME, SESS_SECRET } from "./config";
import router from "./routes/index";
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(
    cookieSession({
        name: SESS_NAME,
        keys: [String(SESS_SECRET)],
        maxAge: Number(SESS_LIFETIME),
    }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiRouter = express.Router();

app.use(API_PATH, apiRouter);

apiRouter.get("/session", async (req, res) => {
    res.send(req.session);
});

apiRouter.use("/", router);

module.exports = app;
