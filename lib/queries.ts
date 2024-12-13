import { client } from "./client"
import { homePagePostSchema, postPageSchema } from "./schemas"

export const getPost = async (id: string) => {
    try {
        const response = await client.get(`/posts/${id}`)

        const {data, error} = postPageSchema.safeParse(response.data)
        console.log(error);
        if (error) {
            return null
        }
        return data
    } catch {
        return null
    }
}

export const getPosts = async () => {
    try {
        const response = await client.get('/posts')

        const {data, error} = homePagePostSchema.safeParse(response.data)
        if (error) {
            return null
        }
        return data
    } catch {
        return null
    }
}