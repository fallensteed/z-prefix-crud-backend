import { model, Schema } from "mongoose";

export interface User {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

const schema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const UserModel = model<User>("User", schema);

export default UserModel;
