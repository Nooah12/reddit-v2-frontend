'use client'
import { editPost } from "@/actions/edit-post"
import { Button } from "@/components/buttons/button"
import { FieldError } from "@/components/field-error"
import { handleServerActionError, toastServerError } from "@/lib/error-handling"
import { postActionSchema, PostPageData, PostValues } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export const EditPostForm = ({defaultValues, postId}: {defaultValues: Pick<PostPageData, 'title' | 'content'>, postId: string}) => {
    const {mutate} = useMutation({
        mutationFn: async(values: PostValues) => {
            handleServerActionError(await editPost({data: values, postId}))
        },
        onError: toastServerError,
    })
    const {register, handleSubmit, formState: {errors}} = useForm<PostValues>({
        resolver: zodResolver(postActionSchema), defaultValues
    })

    return (
        <form onSubmit={handleSubmit((values) => mutate(values))} className="flex w-full flex-col gap-4">
            <input 
                {...register('title')} 
                type="text" 
                placeholder="Title" 
                className="p-2 border rounded-2xl" 
            />
            <FieldError error={errors.title} />
            <textarea 
                {...register('content')} 
                placeholder="Content" 
                className="min-h-96 p-2 border rounded-2xl" 
            />
            <FieldError error={errors.content} />
            <Button type="submit">Save</Button>
        </form>
    )
}