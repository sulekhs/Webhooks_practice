import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../models/User";

export class UserService {
    async createUser(users: DocumentDefinition<Omit<UserDocument, 'createdAt'| 'updatedAt'| 'comparePassword'>>) {
        try {
            return await User.create(users);
        } catch (e:any) {
            throw new Error(e);
        }
    };
    
    
    async validatePassword({email,password} : {email:string, password:string}) {
        const user = await User.findOne({email});
    
        if (!user) {
            return false;
        }
    
        const isValid = await user.comparePassword(password);
    
        if (!isValid) {
           return false; 
        }
        
        return user;
    }
    
    async login(query:FilterQuery<UserDocument>) {
        return User.findOne(query).lean();
    }
}