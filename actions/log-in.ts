'use server'

import { auth } from "@/lib/auth"
import { client } from "@/lib/client"
import { handleAxiosError, ServerActionResponse } from "@/lib/error-handling"
import { logInSchema, type LogInValues } from "@/lib/schemas"
import { redirect } from "next/navigation"

export const logIn = async (data: LogInValues): Promise<ServerActionResponse> => {
    const parsedData = logInSchema.parse(data)

    try {
        const response = await client.post('/auth/log-in', parsedData)
        if (!response.data.accessToken || typeof response.data.accessToken !== 'string'){
            return { error: 'Access token missing' }
        }
        await auth.setAccessToken(response.data.accessToken)

    } catch (error) {
        return handleAxiosError(error) // kollar ifall error från backend (axios)
    }

    redirect('/')
}