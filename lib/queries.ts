import { client } from "./client"
import { commentListSchema, homePagePostSchema, postPageSchema } from "./schemas"

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

export const getComments = async (postId: string) => {
    try {
        console.log('Fetching comments for post:', postId); // Add this
        const response = await client.get(`/posts/${postId}/comments`);
        const { data, error } = commentListSchema.safeParse(response.data);
        console.log(response, error)

        if (error) {
            return null;
        }
        return data;
    } catch (error) {
        console.error(error)
        return null;
    }
}
