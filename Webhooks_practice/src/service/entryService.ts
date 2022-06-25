import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Entry, { EntryDocument } from './../models/Entry';


export async function createEntryRecharge(input: DocumentDefinition<Omit<EntryDocument, 'createdAt'| 'updatedAt'>>) {
    try {
        return await Entry.create(input);
    } catch (e:any) {
        throw new Error(e);
    }
};

export async function findAllEntries() {
    try {
        return await Entry.find();
    } catch (e:any) {
        throw new Error(e);
    }
};

export async function findEntry(query: FilterQuery<EntryDocument>, options: QueryOptions = {lean: true}) {
    try {
        return await Entry.findOne(query, {}, options);
    } catch (e:any) {
        throw new Error(e);
    }
};

export async function findAndUpdateEntry(query: FilterQuery<EntryDocument>, update: UpdateQuery<EntryDocument>, options: QueryOptions) {
    try {
        return await Entry.findOneAndUpdate(query, update, options);
    } catch (e:any) {
        throw new Error(e);
    }
};


export async function deleteEntry(query: FilterQuery<EntryDocument>) {
    try {
        return await Entry.deleteOne(query);
    } catch (e:any) {
        throw new Error(e);
    }
};