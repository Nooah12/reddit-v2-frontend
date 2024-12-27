'use server'
import { auth } from "@/lib/auth"
import { client } from "@/lib/client"
import { handleAxiosError } from "@/lib/error-handling"
import { CommentAction, commentActionSchema } from "@/lib/schemas"
import { revalidatePath } from "next/cache"

export const createComment = async (data: CommentAction, postId: string) => {
    const parsedData = commentActionSchema.parse(data)
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
        return { error: 'Log in to comment' }
    }

    try {
        const response = await client.post(`/posts/${postId}/comments`, parsedData, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })

        revalidatePath(`/post/${postId}`)
        return response.data
    } catch (error) {
        return handleAxiosError(error)
    }
}