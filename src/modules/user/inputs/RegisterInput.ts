import { Length, IsEmail, MinLength } from "class-validator";
import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "../helpers/isEmailAlreadyExist";

const emailExist = "email already exist!";

@InputType()
export class RegisterInput {
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
    @IsEmailAlreadyExist({ message: emailExist })
    @MinLength(5)
    password: string;
}
