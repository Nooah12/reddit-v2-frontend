'use server'

import { auth } from "@/lib/auth"
import { client } from "@/lib/client"
import { revalidatePath } from "next/cache"

export const deleteComment = async (postId: string) => {
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
        return {error: 'Log in to delete comment!'}
    }

    try {
        await client.delete(`/posts/${postId}/comments`, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
    } catch (error) {
        return {error: 'Failed to delete comment'}
    }

    revalidatePath(`/posts/${postId}`)
}