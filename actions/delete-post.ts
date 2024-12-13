'use server'

import { auth } from "@/lib/auth"
import { client } from "@/lib/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const deletePost = async (postId: string) => {
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
        return {error: 'Log in to delete posts!'}
    }

    try {
        await client.delete(`/posts/${postId}`, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })
    } catch (error) {
        return {error: 'Failed to delete post'}
    }

    revalidatePath('/')
    redirect('/')
}