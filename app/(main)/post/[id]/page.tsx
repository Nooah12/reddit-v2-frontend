import { DeletePostButton } from "@/components/buttons/deletePost-button"
import Comments from "@/components/comments"
import { auth } from "@/lib/auth"
import { getPost } from "@/lib/queries"
import Link from "next/link"
import { notFound } from "next/navigation"

export const revalidate = 60 * 15 // 15 minutes

export default async function PostPage({ params }: { params: Promise<{ id: string } >}) {
    const id = (await params).id
    const post = await getPost(id)

    if (!post) {
        return notFound()
    }

    const user = await auth.getUser()
    const isAuthor = user && user.id === post.author.id

    return(
        <main className="main">
            <article className="mb-4 md:mb-6 lg:mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="space-y-1">
                        <span className="text-sm block mb-1 font-normal text-zinc-600">{post.author.username}</span>
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    {isAuthor && ( 
                    <div className="flex gap-2">
                        <Link href={`/post/${post.id}/edit`} className='button-secondary'>Edit</Link>
                        <DeletePostButton postId={post.id} />
                    </div>)}
                </div>
                <p className="text-sm">{post.content}</p>

                <Comments postId={(await params).id} />
            </article>
        </main>
    )
}