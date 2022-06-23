import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import config from "config";

dotenv.config();
export interface UserDocument extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    img?: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword:string):Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    img:{
        type: String,
    }
},
{timestamps: true},
);

UserSchema.pre("save", async function(next) {
    let user = this as unknown as UserDocument;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));

    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    const user = this as unknown as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch(e => false);

}

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User