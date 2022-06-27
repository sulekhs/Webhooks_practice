import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../validation/userValidation";
import { UserService } from "../service/userService";
import logger from "../utils/logger";

export class UserController {

    public UserService: UserService;

    constructor(){
        this.UserService = new UserService();
    }

    createUserHandler:any = async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
        try {
            const user = await this.UserService.createUser(req.body);
            return res.send(omit(user.toJSON(), "password"));
        } catch (e:any) {
            logger.error(e);
            return res.status(401).send(e.message);
        }
    }
}
