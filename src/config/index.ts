import "dotenv/config";

export const {
    PORT = process.env.PORT || 8080,
    NODE_ENV = process.env.NODE_ENV || "local",
    MONGO_URI = "mongodb+srv://dbUser:Pass123@cluster0.ur0wu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    SESS_NAME = "sid",
    SESS_SECRET = "secret!session",
    SESS_LIFETIME = 100 * 60 * 60 * 24 * 1,
    API_PATH = "/backend",
} = process.env;
