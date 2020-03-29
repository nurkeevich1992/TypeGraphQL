import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import User from "../../entity/User";
import MyContext from "../../types/MyContext";
import isAuth from "../../middleware/isAuth";

@Resolver()
class MeResolver {
    @UseMiddleware(isAuth) // Can add more custome middlewares Ex: @UserMiddleware(isAuth, isAdmin, ...)
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
        if (!ctx.req.session!.userId) {
            return undefined;
        }

        return User.findOne(ctx.req.session!.userId);
    }
}

export default MeResolver;
