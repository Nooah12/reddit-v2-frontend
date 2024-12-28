'use server'

import { auth } from "@/lib/auth"
import { client } from "@/lib/client"
import { revalidatePath } from "next/cache"

export const deleteComment = async (commentId: string, postId: string) => {
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
        return {error: 'Log in to delete comment!'}
    }

     try {
        await client.delete(`/comments/${postId}/${commentId}`, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })

        revalidatePath(`/post/${postId}`)
    } catch {
        return {error: 'Failed to delete comment'}
    }
}