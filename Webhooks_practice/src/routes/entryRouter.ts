import { Application, Router } from 'express';
import { EntryController } from '../controller/entryController';


export class EntryRouter {
    public router: Router;
    public EntryController: EntryController;

    constructor() {
        this.router = Router();
        this.routes;
        this.EntryController = new EntryController();
    }
    
    
    routes(app: Application):void{
        app.route("/api/callback/:entryId").put(this.EntryController.callBackHandler);
        app.route("/api/getRecharges").get(this.EntryController.getAllEntriesHandler);
        app.route("/api/getRechargeById/:id").get(this.EntryController.getEntryHandler);
        app.route("/api/deleteRechargeById/:id").get(this.EntryController.deleteEntryHandler);
        app.route("/api/recharge").post(this.EntryController.createEntryHandler);
    }
    
}



