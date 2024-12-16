'use client'
import { createPost } from "@/actions/create-post";
import { Button } from "@/components/buttons/button";
import { FieldError } from "@/components/field-error";
import { handleServerActionError, toastServerError } from "@/lib/error-handling";
import { postActionSchema, PostValues } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export const CreatePostForm = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: PostValues) => {
            handleServerActionError(await createPost(values))
        },
        onError: toastServerError
    })

    const {register, handleSubmit, formState: {errors}} = useForm<PostValues>({
        resolver: zodResolver(postActionSchema)
    })
    
  return (
    <main className="main">
      <h1 className="mb-8 pl-2 text-2xl font-bold">Create post</h1>
      <form onSubmit={handleSubmit((values) => mutate(values))} className="flex w-full flex-col gap-4">
          <input {...register("title")} type="text" placeholder="title" className="p-2 border rounded-2xl"/>
          <FieldError error={errors.title} />
          <textarea {...register("content")} placeholder="content" className="p-2 border rounded-2xl min-h-96" />
          <FieldError error={errors.content} />
          <Button type="submit" variant="secondary">{isPending ? 'Uploading post..' : 'Post'}</Button>
      </form>
    </main>

  );
};