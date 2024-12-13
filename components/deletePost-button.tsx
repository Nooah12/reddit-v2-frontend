'use client'

import { deletePost } from "@/actions/delete-post"
import { handleServerActionError, toastServerError } from "@/lib/error-handling"
import { useMutation } from "@tanstack/react-query"


export const DeletePostButton = ({postId}: {postId: string}) => {
    const {mutate} = useMutation({
        mutationFn: async() => {
            handleServerActionError(await deletePost(postId))
        },
        onError: toastServerError,
    })

    return <button onClick={() => mutate()} className="button-secondary">Delete</button>


}