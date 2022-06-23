import { object, string, number, TypeOf, boolean } from "zod";

const payload = {
    body: object({
        mobileNo:string({
            required_error: "mobileNo is required"
        }),
        amount:number({
            required_error: "amount is required"
        }),
        status:number({
            required_error: "status is required"
        })
    })
};

const params = {
    params: object({
        entryId:number({
            required_error: "entryId is required"
        }),
    })
};

export const createEntrySchema = object({
    ...payload,
    ...params
});

export const updateEntrySchema = object({
    ...payload,
    ...params
});

export const getEntrySchema = object({
    ...params
});

export const getAllEntriesSchema = object({
    ...payload,
    ...params
});

export const deleteEntrySchema = object({
    ...params
});

export type CreateEntryInput = TypeOf<typeof createEntrySchema>
export type updateEntryInput = TypeOf<typeof updateEntrySchema>
export type getEntryInput = TypeOf<typeof getEntrySchema>
export type getAllEntriesInput = TypeOf<typeof getAllEntriesSchema>
export type deleteEntryInput = TypeOf<typeof deleteEntrySchema>

