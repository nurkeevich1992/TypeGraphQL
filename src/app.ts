import "reflect-metadata";
import express from "express";
import apolloServer from "./server";
import { createConnection } from "typeorm";

const app = async () => {
    await createConnection();
    const app = express();
    const server = await apolloServer();

    server.applyMiddleware({ app });

    return app;
};

export default app;
