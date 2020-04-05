import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany
} from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";
import Post from "./Post";

@ObjectType()
@Entity()
class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    name(@Root() { firstName, lastName }: User): string {
        return `${firstName} ${lastName}`;
    }

    @Field()
    @Column("text", { unique: true })
    email: string;

    @Column()
    password: string;

    @Column("boolean", { default: false })
    confirmed: boolean;

    @OneToMany(type => Post, photo => photo.user)
    posts: Post[];
}

export default User;
