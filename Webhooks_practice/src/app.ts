import express from 'express';
import 'dotenv/config';
import { UserRouter } from './routes/userRouter';
import { EntryRouter } from './routes/entryRouter';

class App {
    public app: express.Application;
    public userRoutes: UserRouter = new UserRouter();
    public entryRoutes: EntryRouter = new EntryRouter();

    constructor(){
        this.app = express();
        this.config();
        this.userRoutes.routes(this.app);
        this.entryRoutes.routes(this.app); 
    }

    private config():void{
        this.app.use(express.json());
    }
}

export default new App().app;