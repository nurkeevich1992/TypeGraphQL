import { MiddlewareFn } from "type-graphql";
import MyContext from "../types/MyContext";

/**
 * Just example middleware
 * for more info: https://typegraphql.com/docs/middlewares.html
 *
 * @param param0
 * @param next
 */

const logger: MiddlewareFn<MyContext> = async (
    { args, context, info, root },
    next
) => {
    console.log("args", args);

    return next();
};

export default logger;
