'use server'
import { auth } from "@/lib/auth"
import { client } from "@/lib/client"
import { handleAxiosError } from "@/lib/error-handling"
import { postActionSchema, PostValues } from "@/lib/schemas"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createPost = async (data: PostValues) => {
    const parsedData = postActionSchema.parse(data)
    const accessToken = await auth.getAccessToken()

    if (!accessToken) {
        return { error: 'Log in to create a post'}
    }

    let id; // tillgång till id utanför try-catch, kan ej redirect i try-catch

    try {
        const response = await client.post('/posts', parsedData, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })

        id = response.data.id
    } catch (error) {
        return handleAxiosError(error)
    }

    if (!id || typeof id !== 'string') {
        return { error: 'Something went wrong'}
    }

    revalidatePath('/')
    redirect(`/post/${id}`)
}