'use server'
import { auth } from '@/lib/auth'
import {client} from '@/lib/client'
import { handleAxiosError, ServerActionResponse } from "@/lib/error-handling"
import { signUpSchema, SignUpValues } from "@/lib/schemas"
import { redirect } from 'next/navigation'

export const signUp = async (data: SignUpValues): Promise<ServerActionResponse> => {
    const parsedData = signUpSchema.parse(data)

    try {
        await client.post('/auth/sign-up', parsedData)
        const response = await client.post('/auth/log-in', parsedData)
        
        if (!response.data.accessToken || typeof response.data.accessToken !== 'string'){
            return { error: 'Access token missing' }
        }
        await auth.setAccessToken(response.data.accessToken)

    } catch (error) {
        return handleAxiosError(error)
    }

    redirect('/')
}