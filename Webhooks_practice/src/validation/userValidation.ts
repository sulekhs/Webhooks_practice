import { object, string, TypeOf } from "zod";

export class CreateUserValidationSchema{
    static createUserValidation = object({
        body: object({
            username:string({
                required_error:"username is required"
            }),
            password:string({
                required_error:"password is required"
            }).min(5, "Password too short - should be minimum 6 chars"),
            passwordConfirmation:string({
                required_error:"PasswordConfirmation is required"
            }),
            email:string({
                required_error: "email is required"
            }).email("email is not valid!"),
        }).refine((data) => data.password === data.passwordConfirmation, {
            message: "Passwords don't match",
            path: ["passwordConfirmation"]
        }),
    });
}


export type CreateUserInput = Omit<TypeOf<typeof CreateUserValidationSchema.createUserValidation>, "body.passwordConfirmation">