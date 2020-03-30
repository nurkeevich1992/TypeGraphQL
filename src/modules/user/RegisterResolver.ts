import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg } from "type-graphql";
import User from "../../entity/User";
import RegisterInput from "./inputs/RegisterInput";
import sendEmail from "../../utils/sendEmail";
import createConfirmationUrl from "../../utils/createConfirmationUrl";

@Resolver()
class RegisterResolver {
    @Mutation(() => User)
    async register(
        @Arg("data")
        { firstName, lastName, email, password }: RegisterInput
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        await sendEmail(email, await createConfirmationUrl(user.id));

        return user;
    }
}

export default RegisterResolver;
