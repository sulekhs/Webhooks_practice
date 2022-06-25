import { Application, Router } from 'express';
import { callBackHandler, createEntryHandler, deleteEntryHandler, getAllEntriesHandler, getEntryHandler } from '../controller/entryController';


export class EntryRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes;
    }
    
    
    routes(app: Application):void{
        app.route("/api/callback/:entryId").put(callBackHandler);
        app.route("/api/getRecharges").get(getAllEntriesHandler);
        app.route("/api/getRechargeById/:id").get(getEntryHandler);
        app.route("/api/deleteRechargeById/:id").get(deleteEntryHandler);
        app.route("/api/recharge").post(createEntryHandler);
    }
    
}



