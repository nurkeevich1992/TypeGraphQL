import { Mutation, Resolver, Arg } from "type-graphql";
import User from "../../entity/User";
import { v4 as uuid } from "uuid";
import { redis } from "../../redis";
import sendEmail from "../../utils/sendEmail";
import { Prefixes } from "../../constants/constants";

@Resolver()
class ForgotPasswordResolver {
    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string): Promise<boolean> {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return false;
        }

        const token = uuid();
        await redis.set(
            Prefixes.forgotPassword + token,
            user.id,
            "ex",
            60 * 60 * 24
        );

        await sendEmail(
            email,
            `http://locahost:3000/user/change-password/${token}`
        );

        return true;
    }
}

export default ForgotPasswordResolver;
