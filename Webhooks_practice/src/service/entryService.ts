import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Entry, { EntryDocument } from './../models/Entry';

export class EntryService {
    async createEntryRecharge(input: DocumentDefinition<Omit<EntryDocument, 'createdAt'| 'updatedAt'>>) {
        try {
            const entry = await Entry.create(input);
            return entry;
        } catch (e:any) {
            throw new Error(e);
        }
    };
    
    async findAllEntries() {
        try {
            const findEntries = await Entry.find();
            return findEntries;
        } catch (e:any) {
            throw new Error(e);
        }
    };
    
    async findEntry(query: FilterQuery<EntryDocument>, options: QueryOptions = {lean: true}) {
        try {
            const findENtry = await Entry.findOne(query, {}, options);
            return findENtry;
        } catch (e:any) {
            throw new Error(e);
        }
    };
    
    async findAndUpdateEntry(query: FilterQuery<EntryDocument>, update: UpdateQuery<EntryDocument>, options: QueryOptions) {
        try {
            const updatedEntry = await Entry.findOneAndUpdate(query, update, options);
            return updatedEntry
        } catch (e:any) {
            throw new Error(e);
        }
    };
    
    
    async deleteEntry(query: FilterQuery<EntryDocument>) {
        try {
            const deleteEntry = await Entry.deleteOne(query);
            return deleteEntry;
        } catch (e:any) {
            throw new Error(e);
        }
    };
}