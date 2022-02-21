import express from "express";
import userRouter from "./user/user.router";
import postRouter from "./post/post.router";
import loginRouter from "./login/login.router";
import logoutRouter from "./logout/logout.router";

const router = express.Router();

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);

export default router;
