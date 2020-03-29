import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID, Root } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    // only schema field (does not store data in database)
    @Field()
    name(@Root() { firstName, lastName }: User): string {
        return `${firstName} ${lastName}`;
    }

    @Field()
    @Column("text", { unique: true })
    email: string;

    // database field (can not access on graphql)
    @Column()
    password: string;
}
