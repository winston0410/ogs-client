import type { RequestHandler } from '@sveltejs/kit'
import { handleFetchError, catched } from '../../lib/fetch'
import endpoints from '../../endpoints'

const getNotification = async (token:string) => {
    return fetch(endpoints.notification, {
        method: "GET",
        headers: { authorization: `Bearer ${token}`}
    }).then(handleFetchError).then(res => res.json())
}

export const get: RequestHandler = async (req) => {
    return await catched(async () => {
    const data = await getNotification(req.locals.accessToken)
    return {
        body: data
    }
    })
}
