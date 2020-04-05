import { InputType, Field } from "type-graphql";

@InputType()
class AddPostInput {
    @Field()
    title: string;

    @Field({ nullable: true })
    description: string;
}

export { AddPostInput };
