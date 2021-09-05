import type { RequestHandler } from '@sveltejs/kit'
import { handleFetchError, catched } from '$lib/fetch'
import endpoints from '/src/endpoints'

const acceptNotfication = async (token:string, body:string) => {
    return fetch(endpoints.joinTournament, {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
        body: body
    }).then(handleFetchError).then(res => {
        return res.json()
    })
}

export const post: RequestHandler<{ accessToken: string }, string> = async (req) => {
    return await catched(async () => {
        const data = await acceptNotfication(req.locals.accessToken, req.body)
        return {
            body: data
        }
    })
}
