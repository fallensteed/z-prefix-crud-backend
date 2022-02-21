import express from "express";
import { parseError } from "../../common/functions/errors";
import { validateId } from "../../common/validation/id.validation";
import { post_create, post_update } from "./post.validation";
import PostModel, { Post } from "./post.schema";

const router = express.Router();

router.get("/", async (req, res) => {
    let data: Post[];
    if (Object.keys(req.query).length) {
        const query = req.query;
        data = await PostModel.find(query).populate("user", "-password").sort({ created: -1 });
    } else {
        data = await PostModel.find().populate("user", "-password").sort({ created: -1 });
    }
    res.send(data);
});

router.post("/", async (req, res) => {
    try {
        if (Object.keys(req.body).length) {
            const info = req.body;
            const { error } = post_create.validate(info);
            if (error) throw error;
            const newDocument = new PostModel(info);
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
            const { error } = post_update.validate(info);
            let set: any = {};
            for (let field in info) {
                if (field !== "_id") set[field] = info[field];
            }
            const updatedDocument = await PostModel.updateOne({ _id: info._id }, { $set: set });
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
            const deletedDocument = await PostModel.deleteOne({ _id: info._id });
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

const postRouter = router;
export default postRouter;
