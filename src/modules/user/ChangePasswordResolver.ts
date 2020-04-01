import ChangePasswordInput from "./inputs/ChangePasswordInput";
import { Arg, Resolver, Mutation, Ctx } from "type-graphql";
import User from "../../entity/User";
import { redis } from "../../redis";
import { Prefixes } from "../../constants/constants";
import bcrypt from "bcryptjs";
import MyContext from "../../types/MyContext";

@Resolver()
class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") { token, password }: ChangePasswordInput,
        @Ctx() ctx: MyContext
    ): Promise<User | null> {
        // TODO: how we will now which Prefix to select when app gets big?
        const userId = await redis.get(Prefixes.forgotPassword + token);
        if (!userId) {
            return null;
        }

        const user = await User.findOne(userId);
        if (!user) {
            return null;
        }

        await redis.del(Prefixes.forgotPassword + token);

        user.password = await bcrypt.hash(password, 12);
        await user.save();

        ctx.req.session!.userId = user.id;

        return user;
    }
}

export default ChangePasswordResolver;
