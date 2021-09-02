import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import env from '../../env';
import { handleFetchError, catched } from '../../lib/fetch';
import endpoints from '../../endpoints';

const getExpireTimestamp = (expiresIn: number): number => {
    //  Is expiresIn in s or ms?
	const ts = (expiresIn * 1000) + new Date().getTime();
	return ts;
};

const getAccessToken = async (username: string, password: string) => {
	const queryString = new URLSearchParams();
	queryString.append('grant_type', 'password');
	queryString.append('username', username);
	queryString.append('password', password);
	queryString.append('client_id', env.VITE_CLIENT_ID);
	queryString.append('client_secret', env.VITE_CLIENT_SECRET);

	return fetch(endpoints.accessToken, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: queryString.toString()
	})
		.then(handleFetchError)
		.then((res) => {
			return res.json();
		});
};

export const post: RequestHandler<Locals, string> = async (req) => {
	return await catched(async () => {
		const { name, password } = JSON.parse(req.body);

		if (!name || !password) {
			return {
				status: 400,
				body: {
					message: 'Missing username or password'
				}
			};
		}
		const { access_token, refresh_token, expires_in } = await getAccessToken(name, password);

		req.locals.accessToken = access_token;
		req.locals.refreshToken = refresh_token;

		const ts = getExpireTimestamp(expires_in);

		console.log('check timestamp', ts);

		req.locals.expiresIn = ts;

		//  Use database if needs to scale later
		if (env.VITE_ADMIN_USERNAMES.split(':').includes(name)) {
			req.locals.isAdmin = 1;
		}

		if (req.locals.isAdmin) {
			return {
				status: 302,
				headers: {
					Location: '/admin'
				}
			};
		} else {
			return {
				status: 302,
				headers: {
					Location: '/lobby'
				}
			};
		}
	});
};
