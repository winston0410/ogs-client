export interface LoadOutput<T> {
	ok: boolean;
	value: T;
}

export interface IGames {
	results: Array<IGame>;
}

interface IGame {
	ended: null | string;
	id: number;
}

export interface ITournaments {
	results: Array<null>;
}

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

type INotification =
	| ITimeCop
	| IGameEnded
	| IGameStarted
	| ITournamentStarted
	| ITournamentInvitation;

export interface INotifications {
	result: Array<INotification>;
}
