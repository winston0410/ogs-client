import type { RequestHandler } from '@sveltejs/kit';
import type { IGroups, ITournaments } from '$lib/typing';
import endpoints from '/src/endpoints';
import createFetch from 'wrapped-fetch';
import type { UnwrappedResponse } from 'wrapped-fetch';

const f = createFetch();

const getGroups = async (token: string): Promise<UnwrappedResponse<IGroups>> => {
	return f(endpoints.group, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	});
};

const getOpenTournaments = async (
	token: string,
	groupId: number
): Promise<UnwrappedResponse<ITournaments>> => {
	const queryString = new URLSearchParams();

	queryString.append('page_size', '100');
	queryString.append('page', '1');
	queryString.append('group', `${groupId}`);

	const fetchOpt = {
		method: 'GET',
		headers: {
			authorization: `Bearer ${token}`
		}
	};

	const res = await f<ITournaments>(`${endpoints.tournament}?${queryString.toString()}`, fetchOpt);

    //  Get the last page
	if (!res.body.next) {
		return res;
	}

	const pageCount = Math.ceil(res.body.count / 10);

	const newQueryString = new URLSearchParams();

	newQueryString.append('page_size', '100');
	newQueryString.append('page', `${pageCount}`);
	newQueryString.append('group', `${groupId}`);

	return f(`${endpoints.tournament}?${queryString.toString()}`, fetchOpt);
};

export const put: RequestHandler<{ accessToken: string }, string> = async (req) => {
	try {
		const joinedTournament = [];
		const res = await getGroups(req.locals.accessToken);

		if (!res.ok) {
			return {
				status: 401,
				body: 'Cannot get groups of the user'
			};
		}

		const groups = res.body.results;

		for (const group of groups) {
			getOpenTournaments(req.locals.accessToken, group.id).then((res) => {
				if (!res.ok) {
					return;
				}

				const openTournaments = res.body.results;

				for (const tournament of openTournaments) {
					f(`${endpoints.tournament}/${tournament.id}/players`, {
						method: 'POST',
						headers: {
							authorization: `Bearer ${req.locals.accessToken}`
						}
					}).then((res) => {
						if (!res.ok) {
							return;
						}

						joinedTournament.push(tournament.id);
					});
				}
			});
		}

		return {
			body: joinedTournament
		};
	} catch (e) {
		console.log(e);
	}
};
