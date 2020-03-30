import { buildSchema } from "type-graphql";
import MeResolver from "./modules/user/MeResolver";
import { ApolloServer } from "apollo-server-express";
import RegisterResolver from "./modules/user/RegisterResolver";
import LoginResolver from "./modules/user/LoginResolver";
import customAuthChecker from "./helpers/customAuthChecker";
import ConfirmUserResolver from "./modules/user/ConfirmUserResolver";
import ForgotPasswordResolver from "./modules/user/ForgotPasswordResolver";
import ChangePasswordResolver from "./modules/user/ChangePasswordResolver";

const apolloServer = async () => {
    const schema = await buildSchema({
        authChecker: customAuthChecker,
        resolvers: [
            MeResolver,
            RegisterResolver,
            LoginResolver,
            ConfirmUserResolver,
            ForgotPasswordResolver,
            ChangePasswordResolver
        ]
    });

    return new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    });
};

export default apolloServer;
