import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';
import env from '../../env';
import endpoints from '../../endpoints';
import createFetch from 'wrapped-fetch';
import type { UnwrappedResponse } from 'wrapped-fetch';

const getExpireTimestamp = (expiresIn: number): number => {
	//  Is expiresIn in s or ms?
	const ts = expiresIn * 1000 + new Date().getTime();
	return ts;
};

interface IOAuthResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
}

const getAccessToken = async (
	username: string,
	password: string,
	refreshToken: string
): Promise<UnwrappedResponse<IOAuthResponse>> => {
	const f = createFetch();
	const queryString = new URLSearchParams();
	queryString.append('username', username);
	if (refreshToken) {
		queryString.append('grant_type', 'refresh_token');
		queryString.append('refresh_token', refreshToken);
	} else {
		queryString.append('grant_type', 'password');
		queryString.append('password', password);
	}
	queryString.append('client_id', env.VITE_CLIENT_ID);
	queryString.append('client_secret', env.VITE_CLIENT_SECRET);

	return f(endpoints.accessToken, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: queryString.toString()
	});
};

export const post: RequestHandler<Locals, string> = async (req) => {
	const { name, password, refreshToken } = JSON.parse(req.body);

	if (!name) {
		return {
			status: 400,
			body: {
				message: 'Missing username'
			}
		};
	}

	if (!refreshToken && !password) {
		return {
			status: 400,
			body: {
				message: 'Missing password or refreshToken'
			}
		};
	}
	const res = await getAccessToken(
		name,
		password,
		refreshToken
	)

    if (!res.ok) {
		return {
			status: 401,
			body: {
				message: 'Authorization failed.'
			}
		};
    }
    
    const { access_token, refresh_token, expires_in } = res.body

	req.locals.username = name;
	req.locals.accessToken = access_token;
	req.locals.refreshToken = refresh_token;

	const ts = getExpireTimestamp(expires_in);

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
};
