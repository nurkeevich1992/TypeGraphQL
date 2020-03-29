import { buildSchema } from "type-graphql";
import RecipeResolver from "./modules/RecipeResolver";
import { ApolloServer } from "apollo-server-express";
import RegisterResolver from "./modules/user/RegisterResolver";
import LoginResolver from "./modules/user/LoginResolver";

const apolloServer = async () => {
    const schema = await buildSchema({
        resolvers: [RecipeResolver, RegisterResolver, LoginResolver]
    });

    return new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res })
    });
};

export default apolloServer;
