import { v4 as uuid } from "uuid";
import { redis } from "../redis";

const createConfirmationUrl = async (userId: number) => {
    const id = uuid();
    await redis.set(id, userId, "ex", 60 * 60 * 24); // 1 day exp

    return `http://localhost:3000/user/confirm/${id}`;
};

export default createConfirmationUrl;
