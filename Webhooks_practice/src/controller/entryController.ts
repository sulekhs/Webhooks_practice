import { Request, Response } from "express";
import logger from "../utils/logger";
import { CreateEntryInput, deleteEntryInput, getEntryInput, updateEntryInput } from "../validation/entryValidation";
import { EntryService } from "../service/entryService";
import { UserDocument } from './../models/User';
import axios from "axios";

interface UpdateObj{
    //status?: string | ParsedQs | string[] | ParsedQs[] | undefined;
    status?:number | any;
}

export class EntryController {

    public EntryService: EntryService;

    constructor(){
        this.EntryService = new EntryService();
    }

    //Callback Function Automatically Called when ThirdParty App or Admin Updates Status
    callBackHandler:any = async (req:Request<updateEntryInput['params']>, res: Response) => {
        try {
            console.log("Callback called Status Updated");
            let entryId = req.params.entryId;
            const findId = await this.EntryService.findEntry({entryId});
            if(findId){
                const entryID = findId.entryId;
                const updateObj:UpdateObj={};
                updateObj.status = req.body.status;
                const entry = await this.EntryService.findAndUpdateEntry(
                    {entryId: entryID}, updateObj, {new: true}
                );
                return res.send(entry);
            }
        } catch (e:any) {
            logger.error(e);
            return res.status(500).send(e.message);
        }
    }

    //Get All Entries of Recharges
    getAllEntriesHandler:any = async (req:Request, res: Response) => {
        
        try {
            const entry = await this.EntryService.findAllEntries();
            return res.send(entry);
        } catch (e: any) {
            logger.error(e);
            return res.status(500).send(e.message);
        }
    };


    //Enter MobileNumber, Amount, Status (is default 0) Calling this Api will Create Record in Recharge Table of ThirdPartyApi
    createEntryHandler:any = async (req: Request<updateEntryInput['params'], {}, CreateEntryInput["body"]>, res: Response) => {
        try {
            let user!: UserDocument;
            const body = req.body;
            const entryID = Math.floor(Math.random() * (100000000 - 1 + 1)) + 1;
            
            const entry = await this.EntryService.createEntryRecharge({
                ...body, entryId: entryID,
                user: user})
            
            const entryData = JSON.stringify({
                "yourId" : entry.entryId,
                "mobileNo": req.body.mobileNo,
                "amount": req.body.amount
            });

            const entryRequest = axios({
                baseURL: "http://localhost:3005/api/recharge",
                headers: {"Content-Type": "application/json"},
                method: "POST",
                data: entryData
            });

            return res.status(201).json(entryRequest);
        } catch (e:any) {
            logger.error(e);
            return res.status(500).send(e.message);
        }
    }

    //Get Particular REntry of Recaharge
    getEntryHandler:any = async (req:Request<getEntryInput['params']>, res: Response) => {
        try {
            const entryId = req.params.entryId;
            const entry = await this.EntryService.findEntry({entryId});
            return res.send(entry);
        } catch (e: any) {
            logger.error(e);
            return res.status(500).send(e.message);
        }
    };


    //Delete Entry of Recahrge
    deleteEntryHandler:any = async (req:Request<deleteEntryInput['params']>, res: Response) => {
        try {
            const userId = res.locals.user._id;
            const entryId = req.params.entryId;
            const entry = await this.EntryService.findEntry({entryId});

            if (!entry) {
                return res.sendStatus(404);
            }

            if (String(entry.user) !== userId) {
                return res.sendStatus(403);
            }


            await this.EntryService.deleteEntry({entryId});

            return res.sendStatus(200);
        } catch (e:any) {
            logger.error(e);
            return res.status(500).send(e.message)
        }
    }
}

