'use server'

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export const logOut = async () => {
    await auth.deleteAccessToken()

    redirect('/')
}