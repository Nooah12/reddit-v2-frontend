import 'server-only'
import { cookies } from "next/headers";
import { client } from './client';
import { profileSchema } from './schemas';

const setAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies()

  cookieStore.set('access-token', accessToken, { httpOnly: true })
}

const deleteAccessToken = async () => {
  const cookieStore = await cookies()

  cookieStore.delete('access-token')
}

const getAccessToken = async () => {
  const cookieStore = await cookies()

  return cookieStore.get('access-token')
}

const getUser = async () => {
    const accessToken = await getAccessToken()

    if (!accessToken) {
        return null //  no user?
    }

    try {
        const response = await client.get('/profile', {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })

        const {data, error} = profileSchema.safeParse(response.data) // parse kastar error safeParse returnerar error
        if (error) {
            return null
        }

        return data

    } catch (error) {
        return null
    }
}

export const auth = { setAccessToken, deleteAccessToken, getAccessToken, getUser }