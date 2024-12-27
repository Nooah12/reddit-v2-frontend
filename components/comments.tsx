import { getComments } from "@/lib/queries"
import { CommentData } from "@/lib/schemas";
import CreateCommentForm from "./createCommentForm";
import {DeleteCommentButton} from "./buttons/deleteComment-button";
import Image from "next/image";

type CommentsProps = {
    postId: string;
    postAuthorId: string;
    currentUserId: string | undefined;
}

export default async function Comments({ postId, postAuthorId, currentUserId }: CommentsProps) {
    const comments = await getComments(postId)

    return (
        <>
            <CreateCommentForm postId={postId} />
            {!comments || comments.length === 0 ? (
                <div className='flex mt-8'>
                    <div className='basis-12 mr-4'>
                        <Image src="/thinking-snoo.png" alt="snoo-logo" className='w-auto' width={42} height={42} />
                    </div>
                    <div className='basis-full'>
                        <p className='text-lg font-semibold mb-4'>Be the first to comment</p>
                        <p className='text-sm font-light'>
                            Nobody&apos;s responded to this post yet.<br />
                            Add your thoughts and get the conversation going.
                        </p>
                    </div>
                </div>
            ) : (
                <section className="flex flex-col">
                    {comments.map((comment: CommentData) => {
                        const isCommentAuthor = comment.author.id === currentUserId;
                        const isPostAuthor = postAuthorId === currentUserId;

                        return (
                            <div key={comment.id} className="mb-4">
                                <div className="rounded-2xl p-1 shadow-lg">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-bold text-gray-600">{comment.author.username}</p>
                                        {(isCommentAuthor || isPostAuthor) && 
                                            <DeleteCommentButton commentId={comment.id} postId={postId} />
                                        }
                                    </div>
                                    <p className="text-sm text-gray-600 my-1">{comment.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </section>
            )}
        </>
    )
}
