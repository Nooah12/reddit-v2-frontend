'use client'

import { deletePost } from "@/actions/delete-post"
import { handleServerActionError, toastServerError } from "@/lib/error-handling"
import { useMutation } from "@tanstack/react-query"
import { Button } from "./button"
import { toast } from 'sonner'


export const DeletePostButton = ({postId}: {postId: string}) => {
    const {mutate} = useMutation({
        mutationFn: async() => {
            handleServerActionError(await deletePost(postId))
        },
        onError: toastServerError,
        onMutate: () => toast.loading('Deleting post..'),
        onSuccess: () => toast.success('Your post was deleted!'),
        onSettled: () => toast.dismiss()
    })

    return <Button onClick={() => mutate()} variant='primary'>Delete</Button>

}