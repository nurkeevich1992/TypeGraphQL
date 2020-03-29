import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";

@Resolver()
class RegisterResolver {
    @Mutation(() => User)
    async register(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("email") email: string,
        @Arg("password") password: string
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
