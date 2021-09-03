import type { RequestHandler } from '@sveltejs/kit';
import { handleFetchError, catched } from '../../lib/fetch';
import endpoints from '../../endpoints';

interface _INotification {
	type: string;
	id: string;
}

interface IGameStarted extends _INotification {
	aux_delivered: number;
	black: string;
	game_id: number;
	name: string;
	player_id: number;
	read: number;
	read_timestamp: number;
	timestamp: number;
	type: 'gameStarted';
	white: string;
}

interface ITimeCop extends _INotification {
	type: 'timecop';
	black_player_id: number;
	white_player_id: number;
	current_player: number;
	game_id: number;
	title: string;
	time: number;
	expiration: number;
}
interface IGameEnded extends _INotification {
	type: 'gameEnded';
	annulled: boolean;
	aux_delivered: number;
	black: string;
	black_lost: boolean;
	game_id: number;
	name: string;
	outcome: string;
	player_id: number;
	read: number;
	read_timestamp: number;
	timestamp: number;
	white: string;
	white_lost: string;
}

interface ITournamentStarted extends _INotification {
	type: 'tournamentStarted';
	aux_delivered: number;
	player_id: number;
	read: number;
	read_timestamp: number;
	timestamp: number;
	tournamentid: number;
	tournamentname: string;
}

interface ITournamentInvitation extends _INotification {
	type: 'tournamentInvitation';
	aux_delivered: number;
	invitingUser: string;
	player_id: number;
	read: number;
	read_timestamp: number;
	timestamp: number;
	tournamentid: number;
	tournamentname: string;
	tournamentrqid: number;
}

type INotification = ITimeCop | IGameEnded | IGameStarted | ITournamentStarted | ITournamentInvitation;

const getNotification = async (token: string): Promise<Array<INotification>> => {
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
