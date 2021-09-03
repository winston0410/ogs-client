import type { RequestHandler } from '@sveltejs/kit'
import { handleFetchError, catched } from '$lib/fetch'
import type { ITournaments } from '$lib/typing'
import endpoints from '../../endpoints'

const getTournament = async (token:string): Promise<ITournaments> => {
    return fetch(endpoints.getTournament, {
        method: "GET",
        headers: { authorization: `Bearer ${token}`}
    }).then(handleFetchError).then(res => res.json())
}

export const get: RequestHandler = async (req) => {
    return await catched(async () => {
    const data = await getTournament(req.locals.accessToken)
    return {
        body: data
    }
    })
}

export const post: RequestHandler = async (req) => {
    return await catched(async () => {
    //  const data = await getTournament(req.locals.accessToken)
    //  return {
        //  body: data
    //  }
    })
}
