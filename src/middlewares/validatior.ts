import z from "zod";


export const RegisterUserValidation = z.object({
    name: z.string().min(4, "username should have minimum 4 letters"),
    email: z.email("Email is invalid"),
    password: z.string().min(6, 'password must be atleast 6 characters')
})

export const loginValidation = z.object({
    email: z.email("Invalid Email Address"),
    password: z.string().min(6, "password must be atleast 6 characters")
})

export const createTransactionValidation = z.object({
    userId: z.string('UserId must exists'),
    type: z.enum(["income", "expense"]),
    category: z.string('Category is non-empty field'),
    amount: z.number('Amount is non-empty field'),
    date: z.date('Vaild date string'),
    description: z.string().optional()
});


