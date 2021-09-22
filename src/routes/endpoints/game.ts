import type { RequestHandler } from '@sveltejs/kit';
import endpoints from '../../endpoints';
import type { IGames } from '$lib/typing';
import createFetch from 'wrapped-fetch';
import type { UnwrappedResponse } from 'wrapped-fetch';

const getGame = async (token: string): Promise<UnwrappedResponse<IGames>> => {
	const f = createFetch();
    const fetchOpts = {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	}
	const res = await f<IGames>(endpoints.game, fetchOpts);

    if (!res.ok) {
        return res
    }

    //  Check if there is next page
    if (!res.body.next) {
        return res
    }

    const pageCount = Math.ceil(res.body.count / 10)

    return f<IGames>(`${endpoints.game}?page=${pageCount}`, fetchOpts)
};

export const get: RequestHandler = async (req) => {
	try {
		const data = await getGame(req.locals.accessToken);
		console.log('check get game result', data);
		return {
			body: data.body
		};
	} catch (e) {
		console.log(e);
	}
};
