import { buildSchema } from "type-graphql";
import MeResolver from "./modules/user/MeResolver";
import { ApolloServer } from "apollo-server-express";
import RegisterResolver from "./modules/user/RegisterResolver";
import LoginResolver from "./modules/user/LoginResolver";
import customAuthChecker from "./helpers/customAuthChecker";

const apolloServer = async () => {
    const schema = await buildSchema({
        authChecker: customAuthChecker,
        resolvers: [MeResolver, RegisterResolver, LoginResolver]
    });

    return new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    });
};

export default apolloServer;
