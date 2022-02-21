import express from "express";
import { comparePasswords } from "../../common/functions/encryption";
import { parseError } from "../../common/functions/errors";
import UserModel, { User } from "../user/user.schema";
import { login } from "./login.validation";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if (req.session && Object.keys(req.body).length) {
            const info = req.body;
            const { error } = login.validate(info);
            if (error) throw error;
            const userData = await UserModel.findOne({ username: info.username });
            if (!userData) {
                res.status(404).send({
                    message: "Request Failed: Username not found.",
                });
            } else {
                const isPassword = await comparePasswords(info.password, userData.password);
                if (!isPassword) {
                    res.status(404).send({
                        message: "Request Failed: Incorrect password.",
                    });
                } else {
                    const userInfo = {
                        _id: userData._id,
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        username: userData.username,
                    };
                    req.session.user = { ...userInfo, loggedIn: new Date() };
                    res.send(userInfo);
                }
            }
        } else {
            res.status(404).send({
                message: "Request Failed: Information not sent in request.",
            });
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});

router.get("/session", async (req, res) => {
    if (req.session && req.session.user) {
        res.send(req.session.user);
    } else {
        res.send({});
    }
});

const loginRouter = router;
export default loginRouter;
