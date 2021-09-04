export interface LoadOutput<T> {
	ok: boolean;
    status: number;
	value: T;
}

export interface IPlayer {
	country: string;
	icon: string;
	id: number;
	professional: boolean;
	ranking: number;
	username: string;
}

export interface IGames {
    count: number;
    next: null;
    previous: null;
	results: Array<IGame>;
}

export interface IGame {
	ended: null | string;
	id: number;
	name: string;
	players: {
		black: IPlayer;
		white: IPlayer;
	};
	annulled: boolean;
	black: number;
	black_lost: boolean;
	black_player_rank: number;
	black_player_rating: string;
	creator: number;
	disable_analysis: false;
	handicap: number;
	height: number;
	komi: string;
	mode: string;
	ranked: boolean;
	rules: string;
	source: string;
	outcome: string;
	pause_on_weekends: boolean;
	started: string;
	time_control: string;
	time_per_move: number;
	tournament_round: number;
	white: number;
	white_lost: boolean;
	white_player_rank: number;
	white_player_rating: string;
	width: number;
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

export interface ITournamentInvitation extends _INotification {
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

export type INotification =
	| ITimeCop
	| IGameEnded
	| IGameStarted
	| ITournamentStarted
	| ITournamentInvitation;

export enum StoneColor {
	Black = "black",
	White = "white",
    Grey = "grey",
	Highlight = "highlight"
}
