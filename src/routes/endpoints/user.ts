import type { RequestHandler } from '@sveltejs/kit';
import { handleFetchError, catched } from '../../lib/fetch';
import endpoints from '../../endpoints';
import type { IUser, ICurrentUser } from '$lib/typing';

const getCurrentUser = async (token: string): Promise<ICurrentUser> => {
	return fetch(endpoints.meUser, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	})
		.then(handleFetchError)
		.then((res) => res.json());
};

const getUser = async (id:number, token: string): Promise<IUser> => {
	return fetch(`${endpoints.user}/${id}`, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	})
		.then(handleFetchError)
		.then((res) => res.json());
};

export const get: RequestHandler = async (req) => {
	return await catched(async () => {
		const current = await getCurrentUser(req.locals.accessToken);
        const profile = await getUser(current.id, req.locals.accessToken);
        
		return {
			body: profile
		};
	});
};
