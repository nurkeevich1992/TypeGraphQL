import { Resolver, Query } from "type-graphql";

@Resolver()
class RecipeResolver {
    @Query(() => String)
    async hello() {
        return "Apple 2$";
    }
}

export default RecipeResolver;
