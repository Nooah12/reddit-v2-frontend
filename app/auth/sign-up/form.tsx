'use client'
import { signUp } from "@/actions/sign-up"
import { Button } from "@/components/buttons/button"
import { FieldError } from "@/components/field-error"
import { handleServerActionError, toastServerError } from "@/lib/error-handling"
import { signUpSchema, SignUpValues } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export const SignUpForm = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: SignUpValues) => {
            handleServerActionError(await signUp(values)) // gör om objekt-error till riktiga error?
        },
        onError: toastServerError,
    })

    const {register, handleSubmit, formState: {errors}} = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema)
    })

    return (
        <form onSubmit={handleSubmit((values) => mutate(values))} className="flex w-full max-w-md flex-col gap-4">
            <input {...register('username')} type="text" placeholder="username" className="p-2 border-2 rounded-xl" />
            <FieldError error={errors.password} />
            <input {...register('password')} type="password" placeholder="password" className="p-2 border-2 rounded-xl" />
            <Button variant="primary" type="submit">Join</Button>
        </form>
    )
}