import { Field, InputType } from "type-graphql";

@InputType()
class ChangePasswordInput {
    @Field()
    token: string;

    @Field()
    password: string;
}

export default ChangePasswordInput;
