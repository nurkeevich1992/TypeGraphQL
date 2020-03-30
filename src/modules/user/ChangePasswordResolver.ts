import ChangePasswordInput from "./inputs/ChangePasswordInput";
import { Arg, Resolver, Mutation } from "type-graphql";
import User from "../../entity/User";
import { redis } from "../../redis";
import { Prefixes } from "../../constants/redisPrefixes";
import bcrypt from "bcryptjs";

@Resolver()
class ChangePasswordResolver {
    @Mutation(() => User, { nullable: true })
    async changePassword(
        @Arg("data") { token, password }: ChangePasswordInput
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

        return user;
    }
}

export default ChangePasswordResolver;
