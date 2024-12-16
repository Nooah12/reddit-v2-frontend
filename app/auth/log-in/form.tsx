'use client'
import { logIn } from "@/actions/log-in"
import { Button } from "@/components/buttons/button"
import { FieldError } from "@/components/field-error"
import { handleServerActionError } from "@/lib/error-handling"
import { logInSchema, LogInValues } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"

export const LogInForm = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: async (values: LogInValues) => {
            handleServerActionError(await logIn(values)) // gör om objekt-error till riktiga error?
        }
    })

    const {register, handleSubmit, formState: {errors}} = useForm<LogInValues>({
        resolver: zodResolver(logInSchema)
    })

    return (
        <form onSubmit={handleSubmit((values) => mutate(values))} className="flex w-full max-w-md flex-col gap-4">
            <input {...register('username')} type="text" placeholder="username" className="p-2 border-2 rounded-xl" />
            <FieldError error={errors.password} />
            <input {...register('password')} type="password" placeholder="password" className="p-2 border-2 rounded-xl" />
            <Button variant="primary" type="submit">{isPending ? 'Logging in...' : 'Login'}</Button>
        </form>
    )
}