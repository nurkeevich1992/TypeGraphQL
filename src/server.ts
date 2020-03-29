import { buildSchema } from "type-graphql";
import RecipeResolver from "./modules/RecipeResolver";
import { ApolloServer } from "apollo-server-express";
import RegisterResolver from "./modules/user/RegisterResolver";

const apolloServer = async () => {
    const schema = await buildSchema({
        resolvers: [RecipeResolver, RegisterResolver]
    });

    return new ApolloServer({ schema });
};

export default apolloServer;
