import { MiddlewareFn } from "type-graphql";
import MyContext from "src/types/MyContext";

/**
 * isAuth Middleware alternative to customAuthChecker,
 * adventages of using middleware: can add more than one custom checkers
 * for more info: https://typegraphql.com/docs/middlewares.html
 * used in: MeResolver
 *
 * @param param0
 * @param next
 */

const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    if (!context.req.session!.userId) {
        throw new Error("Not authorized");
    }

    return next();
};

export default isAuth;
