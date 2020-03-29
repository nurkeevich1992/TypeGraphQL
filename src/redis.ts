import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);

export const redisSession = session({
    store: new RedisStore({
        client: new Redis()
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
