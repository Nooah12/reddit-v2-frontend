'use server'

import { auth } from "@/lib/auth"
import { client } from "@/lib/client"
import { revalidatePath } from "next/cache"

export const deleteComment = async (commentId: string, postId: string) => {
    console.log('Deleting comment with ID:', commentId);
    console.log('Revalidating post with ID:', postId);
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
        return {error: 'Log in to delete comment!'}
    }

    try {
        const response = await client.delete(`/comments/${commentId}`, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
        console.log('Backend response:', response.status, response.data);
    } catch (error) {
        return {error: 'Failed to delete comment'}
    }

    revalidatePath(`/post/${postId}`) // /post or /posts ???
}