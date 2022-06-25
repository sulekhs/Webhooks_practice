import mongoose from "mongoose";
import { UserDocument } from "./User";


export interface EntryDocument extends mongoose.Document {
  user?: UserDocument["_id"];
  entryId?: number;
  mobileNo: string;
  amount: number;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

const EntrySchema = new mongoose.Schema(
  { 
    entryId: {
        type: Number,
        required: true,
        //unique: true,
        randomNumbers : () => Math.floor(Math.random() * (100000000 - 1 + 1)) + 1,
      },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mobileNo: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: Number, required: true, default:0 },
  },
  { timestamps: true }
);

const Entry = mongoose.model<EntryDocument>("Entry", EntrySchema);

export default Entry;