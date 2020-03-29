import bcrypt from "bcryptjs";
import { Resolver, Arg, Mutation, Ctx } from "type-graphql";
import { User } from "../../entity/User";
import MyContext from "../../types/MyContext";

@Resolver()
class LoginResolver {
    @Mutation(() => User, { nullable: true })
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return null;
        }

        ctx.req.session!.userId = user.id; // save cookie as userId
        console.log("session", ctx.req.session!.userId);

        return user;
    }
}

export default LoginResolver;