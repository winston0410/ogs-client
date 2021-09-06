import type { RequestHandler } from '@sveltejs/kit';
import endpoints from '../../endpoints';
import type { IUser, ICurrentUser } from '$lib/typing';
import createFetch from "wrapped-fetch"
import type {UnwrappedResponse} from "wrapped-fetch"

const getCurrentUser = async (token: string): Promise<UnwrappedResponse<ICurrentUser>> => {
    const f = createFetch()
	return f(endpoints.meUser, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	})
};

const getUser = async (id: number, token: string): Promise<UnwrappedResponse<IUser>> => {
    const f = createFetch()
	return f(`${endpoints.user}/${id}`, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	})
};

export const get: RequestHandler = async (req) => {
	try {
		const current = await getCurrentUser(req.locals.accessToken);
        if (!current.ok) {
            return current
        }
		const profile = await getUser(current.body.id, req.locals.accessToken);

		return {
			body: profile.body
		};
	} catch (e) {
		console.log(e);
	}
};
