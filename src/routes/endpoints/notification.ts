import type { RequestHandler } from '@sveltejs/kit';
import endpoints from '../../endpoints';
import type { INotifications } from '$lib/typing'

const getNotification = async (token: string): Promise<INotifications> => {
	return fetch(endpoints.notification, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	})
		.then(handleFetchError)
		.then((res) => res.json());
};

export const get: RequestHandler = async (req) => {
	return await catched(async () => {
		const data = (await getNotification(req.locals.accessToken)).map((item) => {
			if (item.timestamp) {
				return {
					...item,
					timestamp: item.timestamp * 1000
				};
			}
			return item;
		});
		return {
			body: data
		};
	});
};
