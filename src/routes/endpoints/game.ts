import type { RequestHandler } from '@sveltejs/kit';
import endpoints from '../../endpoints';
import type { IGames } from '$lib/typing';
import createFetch from "wrapped-fetch"
import type {UnwrappedResponse} from "wrapped-fetch"

const getGame = async (token: string): Promise<UnwrappedResponse<IGames>> => {
    const f = createFetch()
	return f(endpoints.game, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	})
};

export const get: RequestHandler = async (req) => {
	try {
		const data = await getGame(req.locals.accessToken);
		return {
			body: data.body
		};
	} catch (e) {
		console.log(e);
	}
};
