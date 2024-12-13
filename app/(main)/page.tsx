import { getPosts } from "@/lib/queries"
import Link from "next/link"

export const revalidate = 900 // 60 * 15 = 900 // 15 min, pga deploy

export default async function Home() {
    const posts = await getPosts()

    return (
        <div>
            {!posts || posts.length === 0 ? (<p>No posts found</p>) : (
                <section>
                    {posts.map(({ id, title, author}) => (
                        <Link key={id} href={`/post/${id}`}>
                            <span>{author.username}</span>
                            <h2>{title}</h2>
                        </Link>
                    ))}
                </section>
            )}
        </div>
    )
}