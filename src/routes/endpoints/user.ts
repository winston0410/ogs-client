import type { RequestHandler } from '@sveltejs/kit'
import type { Locals } from '$lib/types';
import { handleFetchError } from '../../lib/fetch'

const getUser = async (token:string) => {
    return fetch(`https://online-go.com/api/v1/me`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}`}
    }).then(handleFetchError).then(res => res.json())
}

export const get: RequestHandler = async (req) => {
    const user = await getUser(req.locals.accessToken)
    return {
        body: user
    }
}
