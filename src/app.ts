import "reflect-metadata";
import express from "express";
import apolloServer from "./server";
import { createConnection } from "typeorm";
import { session } from "./redis";

const app = async () => {
    await createConnection();

    const app = express();
    const server = await apolloServer();

    app.use(session);
    server.applyMiddleware({ app });

    return app;
};

export default app;
