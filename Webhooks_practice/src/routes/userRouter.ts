import { Application, RequestHandler, Router } from 'express';
import { createUserHandler } from '../controller/userController';


export class UserRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes;
    }
    
    routes(app: Application):void{
        app.route("/api/register").post(createUserHandler);
    }
    
}



