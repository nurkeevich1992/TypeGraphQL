import { AuthChecker } from "type-graphql";
import MyContext from "src/types/MyContext";

/**
 * Custom Authentication checker to make sure user authenticated
 * this customeAuthChecker function enables @Authorized () decorator to use
 * for more info:
 * https://typegraphql.com/docs/authorization.html
 * https://github.com/MichalLytek/type-graphql/blob/master/docs/authorization.md
 * @param param0
 * @param roles
 */

const customAuthChecker: AuthChecker<MyContext> = ({ context: { req } }) => {
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

    // add more checks if needed ex: Role
    if (req.session!.userId) {
        return true;
    }

    return false; // or false if access is denied
};

export default customAuthChecker;
