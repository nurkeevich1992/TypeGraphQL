import MyContext from "../../types/MyContext";
import { Ctx, Resolver, Mutation } from "type-graphql";
import { Cookies } from "../../constants/constants";

@Resolver(() => Boolean)
class LogoutResolver {
    @Mutation(() => Boolean)
    logout(@Ctx() ctx: MyContext): Promise<Boolean> {
        return new Promise((res, rej) => {
            return ctx.req.session?.destroy(error => {
                if (error) {
                    console.log(error);
                    return rej(false);
                }

                ctx.res.clearCookie(Cookies.qid);
                return res(true);
            });
        });
    }
}

export default LogoutResolver;
