'use client'
import { createPost } from "@/actions/create-post";
import { FieldError } from "@/components/field-error";
import { handleServerActionError, toastServerError } from "@/lib/error-handling";
import { postActionSchema, PostValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const CreatePostForm = () => {
    const { mutate } = useMutation({
        mutationFn: async (values: PostValues) => {
            handleServerActionError(await createPost(values))
        },
        onError: toastServerError
    })

    const {register, handleSubmit, formState: {errors}} = useForm<PostValues>({
        resolver: zodResolver(postActionSchema)
    })
    
  return (
    <form onSubmit={handleSubmit((values) => mutate(values))} className="flex w-full flex-col gap-4">
        <input {...register("title")} type="text" placeholder="title" className="input"/>
        <FieldError error={errors.title} />
        <textarea {...register("content")} placeholder="content" className="input min-h-96 rounded-3xl" />
        <FieldError error={errors.content} />
      <button type="submit" className="primary">Post</button>
    </form>
  );
};