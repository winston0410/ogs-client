import type { RequestHandler } from '@sveltejs/kit';
import endpoints from '../../endpoints';
import createFetch from 'wrapped-fetch';
import type { UnwrappedResponse } from 'wrapped-fetch';
import type { IGroup } from '$lib/typing';

const getGroup = (token: string): Promise<UnwrappedResponse<IGroup>> => {
    const f = createFetch()
	return f(endpoints.group, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	})
};

export const get: RequestHandler = async (req) => {
	try {
		const data = await getGroup(req.locals.accessToken);
		return {
			body: data.body
		};
	} catch (e) {
		console.log(e);
	}
};
