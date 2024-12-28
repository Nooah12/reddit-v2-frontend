import { getPosts } from "@/lib/queries"
import Link from "next/link"

export const revalidate = 900 // 60 * 15 = 900 // 15 min, pga deploy

export default async function Home() {
    const posts = await getPosts()

    return (
        <main className='main space-y-12'>
            <h1 className='text-lg underline'>Latest posts</h1> 
            {!posts || posts.length === 0 ? (<p>No posts found</p>) : (
                <section className='flex flex-col items-center gap-4'>
                    {posts.map(({ id, title, author}) => (
                        <Link key={id} href={`/post/${id}`} className='flex w-full flex-col rounded-3xl bg-white p-4'>
                            <span className='text-zinc-600 text-xs md:text-sm'>{author.username}</span>
                            <h2 className='text-lg font-bold'>{title}</h2>
                        </Link>
                    ))}
                </section>
            )}
        </main>
    )
}