import { Application, RequestHandler, Router } from 'express';
import { UserController } from '../controller/userController';


export class UserRouter {
    public router: Router;
    public UserController: UserController; 

    constructor() {
        this.router = Router();
        this.routes;
        this.UserController = new UserController();
    }
    
    routes(app: Application):void{
        app.route("/api/register").post(this.UserController.createUserHandler);
    }
    
}



