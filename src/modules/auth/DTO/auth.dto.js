import { z } from "zod";
export const registerDTO = z.object({
    email: z.email().lowercase().trim(),
    name: z.string().min(2).max(20).trim(),
    password: z.string().min(8).max(20).trim(),
    provider: z.enum(['local', 'google', 'facebook']).default('local'),
    gender: z.enum(['male', 'female']).optional()

})
export const verifiyAccountDTO = z.object({
    email: z.email().lowercase().trim(),
    code: z.string().trim().length(6)
})
export const loginDTO = z.object({
    email: z.email().lowercase().trim(),
    password: z.string().min(8).max(20).trim()
})
export const sendDTO = z.object({
    email: z.email().lowercase().trim()

})
export const resetPasswordDTO = z.object({

    email: z.email().lowercase().trim(),
    code: z.string().trim().length(6),
    newPassword: z.string().min(8).max(20).trim()

})