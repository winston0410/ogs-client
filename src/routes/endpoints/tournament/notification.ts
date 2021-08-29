import type { RequestHandler } from '@sveltejs/kit'
import { handleFetchError, catched } from '../../lib/fetch'
import endpoints from '../../endpoints'

const getNotification = async (token:string) => {
    return fetch(endpoints.joinTournament, {
        method: "POST",
        headers: { authorization: `Bearer ${token}`},
        body: JSON.stringify({

        })
    }).then(handleFetchError).then(res => res.json())
}

export const post: RequestHandler = async (req) => {
    console.log('check req body', req.body)
    return await catched(async () => {
    const data = await getNotification(req.locals.accessToken)
    return {
        body: data
    }
    })
}
