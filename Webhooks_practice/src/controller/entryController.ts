import { Request, Response } from "express";
import logger from "../utils/logger";
import { CreateEntryInput, deleteEntryInput, getAllEntriesInput, getEntryInput, updateEntryInput } from "../validation/entryValidation";
import { createEntry, findEntry, findAllEntries, deleteEntry, createEntryRecharge, findAndUpdateEntry } from "../service/entryService";
import { UserDocument } from './../models/User';
import fetch from "node-fetch";


//Callback Function Automatically Called when ThirdParty App or Admin Updates Status
export async function callBackHandler(req:Request<updateEntryInput['params']>, res: Response) {
    try {
        console.log("Callback called Status Updated");
        const entryID = req.body.yourId;
        const status = {"status": req.body.status}
        const body = req.body;
        const entry = await createEntry({
            ...body, entryId: entryID, ...status
        });
        return res.send(entry);
    } catch (e:any) {
        logger.error(e);
        return res.status(401).send(e.message);
    }
}

//Get All Entries of Recharges
export async function getAllEntriesHandler(req:Request, res: Response) {
    
    const entry = await findAllEntries();

    if (!entry) {
        return res.sendStatus(404);
    }

    return res.send(entry);
};


//Enter MobileNumber, Amount, Status (is default 0) Calling this Api will Create Record in Recharge Table of ThirdPartyApi
export async function createEntryHandler(req: Request<updateEntryInput['params'], {}, CreateEntryInput["body"]>, res: Response) {
    try {
        let user!: UserDocument;
        const body = req.body;
        const entryID = Math.floor(Math.random() * (100000000 - 1 + 1)) + 1;
        const update = req.body;
        // const entryTable = await findEntry({entryID});

        // if (!entryTable) {
        //     return res.sendStatus(404);
        // }

        const entry = await createEntryRecharge({
            ...body, entryId: entryID,
            user: user
        }).then(async created => {
            await fetch("http://localhost:3005/api/recharge", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ "yourId": created.entryId, "mobileNo": req.body.mobileNo, "amount": req.body.amount })
            }).then(result => {
                return result.json();
            }).then(async result => {
                console.log(result);
                const updatedEntry = await findAndUpdateEntry({entryID}, update, { new: true }
                ).then(found => {
                    if (found) {
                        console.log("updated");
                    }
                });
                
                return res.send(updatedEntry);
            })
        })
        
        return res.send(entry);
    } catch (e:any) {
        logger.error(e);
        return res.status(401).send(e.message);
    }
}

//Get Particular REntry of Recaharge
export async function getEntryHandler(req:Request<getEntryInput['params']>, res: Response) {
    
    const entryId = req.params.entryId;
    const entry = await findEntry({entryId});

    if (!entry) {
        return res.sendStatus(404);
    }

    return res.send(entry);
};


//Delete Entry of Recahrge
export async function deleteEntryHandler(req:Request<deleteEntryInput['params']>, res: Response) {
    try {
        const userId = res.locals.user._id;
        const entryId = req.params.entryId;
        const entry = await findEntry({entryId});

        if (!entry) {
            return res.sendStatus(404);
        }

        if (String(entry.user) !== userId) {
            return res.sendStatus(403);
        }


        await deleteEntry({entryId});

        return res.sendStatus(200);
    } catch (e:any) {
        logger.error(e);
        return res.status(401).send(e.message)
    }
}

