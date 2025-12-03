import z from "zod";


export const RegisterUserValidation = z.object({
    name: z.string().min(4, "username should have minimum 4 letters"),
    email: z.email("Email is invalid"),
    password: z.string().min(6, 'password must be atleast 6 characters')
})

export const loginValidation = z.object({
    emai: z.email("Invalid Email Address"),
    password: z.string().min(6, "password must be atleast 6 characters")
})