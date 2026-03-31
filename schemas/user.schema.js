const {z} =require('zod');

const createUserSchema = z.object({
    name: z.string().min(2),
    email: z.string().email()
});

const updateUserSchema =z.object({
    name: z.string().min(2).optional(),
    email : z.string().email().optional()
}).refine(
    data => Object.keys(data).length >0,{
        message:'At least one field required'
    });

    module.exports ={createUserSchema,updateUserSchema};