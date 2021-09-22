import type { RequestHandler } from '@sveltejs/kit';
import endpoints from '../../endpoints';
import type { INotification } from '$lib/typing';
import createFetch from 'wrapped-fetch';
import type { UnwrappedResponse } from 'wrapped-fetch';

const f = createFetch();

const getNotification = async (token: string): Promise<UnwrappedResponse<Array<INotification>>> => {
	return f(endpoints.notification, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	});
};

export const get: RequestHandler = async (req) => {
	const data = (await getNotification(req.locals.accessToken)).body.map((item) => {
		if (!item.timestamp) {
			return item;
		}

		return {
			...item,
			timestamp: item.timestamp * 1000
		};
	});
	return {
		body: data
	};
};
