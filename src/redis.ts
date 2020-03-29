import Redis from "ioredis";
import sessionObj from "express-session";
import connectRedis from "connect-redis";

const redis = new Redis();
const RedisStore = connectRedis(sessionObj);

export const session = sessionObj({
    store: new RedisStore({
        client: redis
    }),
    name: "qid",
    secret: "aslkdfjoiq12312", // TODO: put in evn file in future
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
    }
});
