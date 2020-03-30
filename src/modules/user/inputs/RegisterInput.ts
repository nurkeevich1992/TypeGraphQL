import { Length, IsEmail, MinLength } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "../helpers/isEmailAlreadyExist";

const emailExistMessage = "email already exist!";

@InputType()
class RegisterInput {
    @Field()
    @Length(1, 30)
    firstName: string;

    @Field()
    @Length(1, 30)
    lastName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsEmailAlreadyExist({ message: emailExistMessage })
    @MinLength(5)
    password: string;
}

export default RegisterInput;
