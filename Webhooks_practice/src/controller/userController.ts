import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../validation/userValidation";
import { createUser } from "../service/userService";
import logger from "../utils/logger";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(omit(user.toJSON(), "password"));
    } catch (e:any) {
        logger.error(e);
        return res.status(401).send(e.message);
    }
}