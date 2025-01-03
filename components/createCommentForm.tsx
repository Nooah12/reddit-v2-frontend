'use client'
import { Button } from "@/components/buttons/button"
import { handleServerActionError, toastServerError } from "@/lib/error-handling";
import { CommentAction, commentActionSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { FieldError } from "./field-error";
import { createComment } from "@/actions/create-comment";

const CreateCommentForm = ({ postId }: { postId: string }) => {
    const { mutate } = useMutation({
        mutationFn: async (values: CommentAction) => {
            handleServerActionError(await createComment(values, postId))
        },
        onError: toastServerError,
        onSuccess: () => reset()
    })

    const {register, handleSubmit, reset, formState: {errors}} = useForm<CommentAction>({
        resolver: zodResolver(commentActionSchema)
    })
    
    return (
        <form onSubmit={handleSubmit((values) => mutate(values))} className="flex w-full flex-col mb-4 relative">
            <textarea 
                {...register('content')}
                placeholder="Add a comment"
                className="p-2 pr-24 mb-4 md:mb-2 border rounded-2xl text-sm" 
                rows={4}
            />
            <FieldError error={errors.content} />
            <div className="absolute right-2 top-[67%] md:top-[72%] -translate-y-1/2">
                <Button className="w-20" type="submit" variant="secondary">Comment</Button>
            </div>
        </form>
    )
}

export default CreateCommentForm