import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg } from "type-graphql";
import User from "../../entity/User";
import { RegisterInput } from "./inputs/RegisterInput";

@Resolver()
class RegisterResolver {
    @Mutation(() => User)
    async register(
        @Arg("data")
        { firstName, lastName, email, password }: RegisterInput
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        return user;
    }
}

export default RegisterResolver;
