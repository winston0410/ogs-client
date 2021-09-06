import type { RequestHandler } from '@sveltejs/kit';
import type { ITournaments } from '$lib/typing';
import endpoints from '../../endpoints';
import createFetch from 'wrapped-fetch';
import type { UnwrappedResponse } from 'wrapped-fetch';

const getTournament = async (token: string): Promise<UnwrappedResponse<ITournaments>> => {
	const f = createFetch();
	return f(endpoints.meTournament, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	});
};

export const get: RequestHandler = async (req) => {
	try {
		return await getTournament(req.locals.accessToken);
	} catch (e) {
		console.log(e);
	}
};
