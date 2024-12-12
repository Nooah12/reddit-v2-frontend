import { client } from "./client"
import { postPageSchema } from "./schemas"

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