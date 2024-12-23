'use client'

import { deletePost } from "@/actions/delete-post"
import { handleServerActionError, toastServerError } from "@/lib/error-handling"
import { useMutation } from "@tanstack/react-query"
import { Button } from "./button"

export const DeletePostButton = ({postId}: {postId: string}) => {
    const {mutate} = useMutation({
        mutationFn: async() => {
            handleServerActionError(await deletePost(postId))
        },
        onError: toastServerError,
    })

    return <Button onClick={() => mutate()} variant='primary'>Delete</Button>

}