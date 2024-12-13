import { DeletePostButton } from "@/components/deletePost-button"
import { auth } from "@/lib/auth"
import { getPost } from "@/lib/queries"
import Link from "next/link"
import { notFound } from "next/navigation"

export const revalidate = 60 * 15 // 15 minutes

export default async function PostPage ({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id
    const post = await getPost(id)

    if (!post) {
        return notFound()
    }

    const user = await auth.getUser()
    const isAuthor = user && user.id === post.author.id

    return(
        <main className="main">
            <article className="space-y-4">
                <header className="flex items-start justify-between">
                    <div className="space-y-1">
                        <span>{post.author.username}</span>
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    {isAuthor && ( 
                    <div>
                        <Link href={`/post/${post.id}/edit`} className='button-secondary'>Edit</Link>
                        <DeletePostButton postId={post.id} />
                    </div>)}
                </header>
                <p className="text-gray-500">{post.content}</p>
            </article>
        </main>
    )
}