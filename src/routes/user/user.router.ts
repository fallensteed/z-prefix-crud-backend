import express from "express";
import { parseError } from "../../common/functions/errors";
import { validateId } from "../../common/validation/id.validation";
import UserModel, { User } from "./user.schema";
import { user_create, user_update } from "./user.validation";
import { encrypt } from "../../common/functions/encryption";

const router = express.Router();

router.get("/", async (req, res) => {
    let data: User[];
    if (Object.keys(req.query).length) {
        const query = req.query;
        data = await UserModel.find(query).select("-password");
    } else {
        data = await UserModel.find().select("-password");
    }
    res.send(data);
});

router.post("/", async (req, res) => {
    try {
        if (Object.keys(req.body).length) {
            const info = req.body;
            const { error } = user_create.validate(info);
            info.password = await encrypt(info.password);
            if (error) throw error;
            const newDocument = new UserModel(info);
            await newDocument.save();
            res.send(newDocument);
        } else {
            res.status(404).send({
                message: "Request Failed: Information not sent in request.",
            });
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});

router.patch("/", async (req, res) => {
    try {
        if (Object.keys(req.body).length) {
            const info = req.body;
            const { error } = user_update.validate(info);
            let set: any = {};
            for (let field in info) {
                if (field !== "_id") set[field] = info[field];
            }
            if (set.password) {
                set.password = await encrypt(set.password);
            }
            const updatedDocument = await UserModel.updateOne({ _id: info._id }, { $set: set });
            res.send(updatedDocument);
        } else {
            res.status(404).send({
                message: "Request Failed: Information not sent in request.",
            });
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});

router.delete("/", async (req, res) => {
    try {
        if (Object.keys(req.body).length) {
            const info = req.body;
            const { error } = validateId.validate(info);
            if (error) throw error;
            const deletedDocument = await UserModel.deleteOne({ _id: info._id });
            res.send(deletedDocument);
        } else {
            res.status(404).send({
                message: "Request Failed: Information not sent in request.",
            });
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});

const userRouter = router;
export default userRouter;
