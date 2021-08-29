import type { RequestHandler } from '@sveltejs/kit'
import { handleFetchError, catched } from '../../lib/fetch'
import endpoints from '../../endpoints'

const getGame = async (token:string) => {
    return fetch(endpoints.game, {
        method: "GET",
        headers: { authorization: `Bearer ${token}`}
    }).then(handleFetchError).then(res => res.json())
}

export const get: RequestHandler = async (req) => {
    return await catched(async () => {
    const data = await getGame(req.locals.accessToken)
    return {
        body: data
    }
    })
}
