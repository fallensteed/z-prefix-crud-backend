import { model, Schema } from "mongoose";

export interface Post {
    user: Schema.Types.ObjectId;
    title: string;
    content: string;
    created: Date;
    edited?: Date;
}

const schema = new Schema<Post>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, required: true },
    edited: { type: Date }
});

const PostModel = model<Post>("Post", schema);

export default PostModel;
