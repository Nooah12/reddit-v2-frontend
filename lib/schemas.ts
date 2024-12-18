import {z} from 'zod'

export const signUpSchema = z.object({
    username: z.string().min(2, 'Username must be at least 2 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})  
export type SignUpValues = z.infer<typeof signUpSchema>

export const logInSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
})
export type LogInValues = z.infer<typeof logInSchema>

export const postActionSchema = z.object({ // edit / create Post - validera users data (skapa post)
    title: z.string().min(1, 'Title is required'),
    content: z.string().optional(),
})
export type PostValues = z.infer<typeof postActionSchema>

export const profileSchema = z.object({
    username: z.string(),
    id: z.string(),
})
export type ProfileData = z.infer<typeof profileSchema>

// getPost, posts.ts / queries.ts
export const postPageSchema = z.object({ // edit post?
    id: z.string(),
    title: z.string(),
    content: z.string().optional(),
/*     createdAt: z.string(),
    updatedAt: z.string(), */
    author: profileSchema,
    // comments
})
export type PostPageData = z.infer<typeof postPageSchema>

// getPosts
export const homePagePostSchema = z.array(
    z.object({
        id: z.string(),
        title: z.string(),
        author: z.object({
            username: z.string()
        })
    })
)
export type HomePagePostData = z.infer<typeof homePagePostSchema>

export const commentSchema = z.object({
    id: z.string(),
    content: z.string().min(1, 'Comment is required'),
    author: profileSchema,
    //post: z.string().optional(),
})
export type CommentData = z.infer<typeof commentSchema>

export const commentActionSchema = z.object({
    content: z.string()
})
export type CommentAction = z.infer<typeof commentActionSchema>

export const commentListSchema = z.array(commentSchema);
export type CommentListData = z.infer<typeof commentListSchema>;