const {z} = require('zod');

const registerSchema = z.object({
    name: z.string().min(2 ,'Name must be at least 2 char'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, ' Password must be atleast 8 characters')
});

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, ' Password is required')
});

module.exports ={registerSchema,loginSchema};