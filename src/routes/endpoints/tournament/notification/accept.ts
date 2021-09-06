import type { RequestHandler } from '@sveltejs/kit';
import endpoints from '/src/endpoints';
import createFetch from 'wrapped-fetch';
import type { UnwrappedResponse } from 'wrapped-fetch';

const acceptNotfication = async (token: string, body: string) => {
	const f = createFetch();
	return f(endpoints.joinTournament, {
		method: 'POST',
		headers: { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
		body: body
	});
};

export const post: RequestHandler<{ accessToken: string }, string> = async (req) => {
	try {
		return await acceptNotfication(req.locals.accessToken, req.body);
	} catch (e) {
		console.log(e);
	}
};
