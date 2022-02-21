import express from "express";
import { parseError } from "../../common/functions/errors";
import { validateId } from "../../common/validation/id.validation";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        if (req.session && req.session.user && Object.keys(req.body).length) {
            const info = req.body;
            const { error } = validateId.validate(info);
            if (error) throw error;
            req.session = null;
            res.status(200).send({ message: "Logged out" });
        } else {
            res.status(404).send({
                message: "Request Failed: Session doesn't exist.",
            });
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});

const logoutRouter = router;
export default logoutRouter;
