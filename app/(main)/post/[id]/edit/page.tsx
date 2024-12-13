import { auth } from "@/lib/auth"
import { getPost } from "@/lib/queries"
import { notFound } from "next/navigation"
import { EditPostForm } from "./form"

export default async function EditPostPage({params}: {params: Promise<{id: string}>}) {
    const id = (await params).id
    const post = await getPost(id)
    const user = await auth.getUser()
    const isAuthor = user && user.id === post?.author.id

    if (!post || !isAuthor) { // om inlägget inte finns eller skaparen?
        return notFound()
    }

    return (
        <main className="main">
            <h1 className="mb-8 pl-2 text-2xl font-bold">Edit post</h1>
            <EditPostForm postId={post.id} defaultValues={{title: post.title, content: post.content}} />
        </main>
    )
}