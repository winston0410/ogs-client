import type { RequestHandler } from '@sveltejs/kit';
import type { INotification, IGroup, ITournament } from '$lib/typing';
import endpoints from '/src/endpoints';
import createFetch from 'wrapped-fetch';
import type { UnwrappedResponse } from 'wrapped-fetch';

const getNotification = async (token: string): Promise<UnwrappedResponse<Array<INotification>>> => {
	const f = createFetch();
	return f(endpoints.notification, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	});
};

export const post: RequestHandler<{ accessToken: string }, string> = async (req) => {
	try {
		const joinedTournament = [];
		const notifications = await getNotification(req.locals.accessToken);
		const f = createFetch();

		if (!notifications.ok) {
			return {
				status: 401
			};
		}

		for (const n of notifications.body) {
			if (n.type === 'tournamentInvitation') {
				const res = await f<ITournament>(`${endpoints.tournament}/${n.tournamentid}`, {
					method: 'GET',
					headers: { authorization: `Bearer ${req.locals.accessToken}` }
				});

				if (res.body.group.id === 10004) {
					const ts = new Date().getTime();
					if (ts < new Date(res.body.time_start).getTime()) {
						const joinRes = await f(endpoints.joinTournament, {
							method: 'POST',
							headers: {
								authorization: `Bearer ${req.locals.accessToken}`,
								'Content-Type': 'application/json'
							},
							body: JSON.stringify({
								request_id: n.tournamentrqid
							})
						})

                        if (joinRes.ok) {
							joinedTournament.push(n.tournamentid);
                        }
					}
				}
			}
		}

		return {
			body: joinedTournament
		};
	} catch (e) {
		console.log(e);
	}
};
