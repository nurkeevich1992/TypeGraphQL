import { InputType, Field } from "type-graphql";
import { IsEmailAlreadyExist } from "../user/helpers/isEmailAlreadyExist";
import { MinLength } from "class-validator";

@InputType()
class PasswordInput {
    @Field()
    @IsEmailAlreadyExist()
    @MinLength(5)
    password: string;
}

export default PasswordInput;
