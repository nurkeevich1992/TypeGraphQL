import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToOne
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import User from "./User";

@ObjectType()
@Entity()
class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @CreateDateColumn()
    date: Date;

    @Column({ default: false })
    published: boolean;

    @ManyToOne(type => User, user => user.posts)
    user: User;
}

export default Post;
