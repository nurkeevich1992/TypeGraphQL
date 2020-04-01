import { Length, IsEmail } from "class-validator";
import { InputType, Field } from "type-graphql";
import PasswordInput from "../../shared/PasswordInput";

@InputType()
class RegisterInput extends PasswordInput {
    @Field()
    @Length(1, 30)
    firstName: string;

    @Field()
    @Length(1, 30)
    lastName: string;

    @Field()
    @IsEmail()
    email: string;
}

export default RegisterInput;
