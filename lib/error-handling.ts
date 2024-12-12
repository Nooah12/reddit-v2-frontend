import { isAxiosError } from "axios"
import { isRedirectError } from "next/dist/client/components/redirect"
import { toast } from "sonner"

export type ServerActionResponse = { error: string} | undefined | void

// används i form.tsx - gör om error från object till ett "riktigt error" ?
export const handleServerActionError = (response: ServerActionResponse) => {
    if (response?.error) {
        throw Error(response.error)
    }
}

// används i log-in.ts
export const handleAxiosError = (error: unknown): ServerActionResponse => {
    const defaultErrorMessage = "Something went wrong"
    if (!isAxiosError(error)) {
        console.error(error)
        return { error: "Something went wrong" }
    }

    return { error: error.response?.data.message || defaultErrorMessage } // om inte axios error så default "backup" error för user
}

export const toastServerError = (error: Error) => { // redirect error?
    if (!isRedirectError(error)) {
        toast.error(error.message)
    }
}