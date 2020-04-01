import { v4 as uuid } from "uuid";
import { redis } from "../redis";
import { Prefixes } from "../constants/constants";

const createConfirmationUrl = async (userId: number) => {
    const token = uuid();
    await redis.set(Prefixes.confirmUser + token, userId, "ex", 60 * 60 * 24); // 1 day exp

    return `http://localhost:3000/user/confirm/${token}`;
};

export default createConfirmationUrl;
