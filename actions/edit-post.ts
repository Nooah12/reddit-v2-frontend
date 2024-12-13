'use server'

import { auth } from "@/lib/auth"
import { client } from "@/lib/client"
import { handleAxiosError } from "@/lib/error-handling"
import { postActionSchema, PostValues } from "@/lib/schemas"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const editPost = async ({data, postId}: {data: PostValues, postId: string}) => {
    const parsedData = postActionSchema.parse(data)
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
        return {error: 'Log in to edit posts!'}
    }
    
    try {
        await client.put(`/posts/${postId}`, parsedData, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
    } catch (error) {
        return handleAxiosError(error)
    }

    revalidatePath('/')
    redirect(`/post/${postId}`)
}