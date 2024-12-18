/* import { getComments } from "@/lib/queries"
import { CommentData } from "@/lib/schemas";

type CommentsProps = {
    postId: string
}

export default async function Comments({ postId }: CommentsProps) {
    //const comments = await getComments(postId)
    const comments: CommentData[] = await getComments(postId);

    return (
        <>
        {/* {currentUserId && <CreateCommentForm postId={postId} />} 
        {!comments || comments.length === 0 ? (
            <div className='flex mt-8'>
            <div className='basis-12 mr-4'>
                <img src="/thinking-snoo.png" alt="snoo-logo" className='w-auto' />
            </div>
            <div className='basis-full'>
                <p className='text-lg font-semibold mb-4'>Be the first to comment</p>
                <p className='text-sm font-light'>
                Nobody's responded to this post yet.<br />
                Add your thoughts and get the conversation going.
                </p>
            </div>
            </div>
        ) : (
            <section className='flex flex-col'> 
                {comments.map(({ id, content, author }) => (
                    <div key={id} className="p-4 border rounded">
                        <p className="text-sm text-gray-600">{author.username}</p>
                        <p className="text-base">{content}</p>
                    </div>
                ))}
            </section>
        )}
    </>
    )
} */




import { getComments } from "@/lib/queries"
import { CommentData } from "@/lib/schemas";
import CreateCommentForm from "./createCommentForm";

type CommentsProps = {
    postId: string
}

export default async function Comments({ postId }: CommentsProps) {
    const comments = await getComments(postId)
    console.log(comments)

    return (
        <>
            <CreateCommentForm postId={postId} />
            {!comments || comments.length === 0 ? (
                <div className='flex mt-8'>
                    <div className='basis-12 mr-4'>
                        <img src="/thinking-snoo.png" alt="snoo-logo" className='w-auto' />
                    </div>
                    <div className='basis-full'>
                        <p className='text-lg font-semibold mb-4'>Be the first to comment</p>
                        <p className='text-sm font-light'>
                            Nobody's responded to this post yet.<br />
                            Add your thoughts and get the conversation going.
                        </p>
                    </div>
                </div>
            ) : (
                <section className='flex flex-col'>
                    {comments.map((comment: CommentData) => (
                        <div key={comment.id} className="p-4 border rounded">
                            <p className="text-sm text-gray-600">{comment.author.username}</p>
                            <p className="text-base">{comment.content}</p>
                        </div>
                    ))}
                </section>
            )}
        </>
    )
}
