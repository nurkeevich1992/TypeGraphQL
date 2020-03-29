import "reflect-metadata";
import express from "express";
import apolloServer from "./server";
import { createConnection } from "typeorm";
import { redisSession } from "./redis";
import cors from "cors";

const app = async () => {
    await createConnection();

    const app = express();
    const server = await apolloServer();

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:3000"
        })
    );

    app.use(redisSession);
    server.applyMiddleware({ app });

    return app;
};

export default app;
