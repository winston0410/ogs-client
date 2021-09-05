import type { RequestHandler } from '@sveltejs/kit';
import { handleFetchError, catched } from '$lib/fetch';
import type { INotification, IGroup, ITournament } from '$lib/typing';
import endpoints from '/src/endpoints';

const getNotification = async (token: string): Promise<Array<INotification>> => {
	return fetch(endpoints.notification, {
		method: 'GET',
		headers: { authorization: `Bearer ${token}` }
	})
		.then(handleFetchError)
		.then((res) => res.json());
};

export const post: RequestHandler<{ accessToken: string }, string> = async (req) => {
	return catched(async () => {
		const joinedTournament = [];
		const notifications = await getNotification(req.locals.accessToken);

		for (const n of notifications) {
			if (n.type === 'tournamentInvitation') {
				fetch(`${endpoints.tournament}/${n.tournamentid}`, {
					method: 'GET',
					headers: { authorization: `Bearer ${req.locals.accessToken}` }
				})
					.then((res) => {
						return res.json();
					})
					.then((res: ITournament) => {
						if (res.group.id === 10004) {
							const ts = new Date().getTime();
							if (ts < new Date(res.time_start).getTime()) {
								fetch(endpoints.joinTournament, {
									method: 'POST',
									headers: {
										authorization: `Bearer ${req.locals.accessToken}`,
										'Content-Type': 'application/json'
									},
									body: JSON.stringify({
										request_id: n.tournamentrqid
									})
								})
									.then(handleFetchError)
									.then(() => {
										joinedTournament.push(n.tournamentid);
									})
									.catch(() => {
										//  TODO: Handle unjoinable tournament
									});
							}
						}
					});
			}
		}

		return {
			body: joinedTournament
		};
	});
};
