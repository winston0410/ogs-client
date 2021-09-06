export interface ICurrentUser {
	about: string;
	id: number;
	ranking: number;
	username: string;
}

export interface IUser extends ICurrentUser {
	icon: string;
	professional: boolean;
	country: string;
	language: string;
	supporter: boolean;
	is_bot: boolean;
	website: string;
	registration_date: string;
	name: null | string;
	timeout_provisional: boolean;
	is_friend: boolean;
}

export interface IPlayer {
	country: string;
	icon: string;
	id: number;
	professional: boolean;
	ranking: number;
	username: string;
}

export interface ITournaments {
	count: number;
	next: null;
	previous: null;
	results: Array<ITournament>;
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
	outcome: "Timeout" | "Resignation";
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

export interface IGroup {
	id: number;
	name: string;
	summary: string;
	require_invitation: boolean;
	is_public: boolean;
	hide_details: boolean;
	member_count: number;
	icon: string;
}

export interface ITournament {
	id: number;
	name: string;
	//  director: {}
	description: string;
	schedule: null;
	title: null;
	tournament_type: string;
	handicap: number;
	rules: string;
	is_open: boolean;
	exclude_provisional: boolean;
	group: IGroup;
	time_start: string;
	//  "time_control_parameters": {
	//  "system": "fischer",
	//  "time_control": "fischer",
	//  "speed": "correspondence",
	//  "time_increment": 86400,
	//  "initial_time": 259200,
	//  "max_time": 604800
	//  },
	//  "player_is_member_of_group": true,
	//  "auto_start_on_max": false,
	//  "time_start": "2021-11-04T05:00:00-04:00",
	//  "players_start": 4,
	//  "first_pairing_method": "slide",
	//  "subsequent_pairing_method": "slaughter",
	//  "min_ranking": 5,
	//  "max_ranking": 38,
	//  "analysis_enabled": true,
	//  "exclusivity": "open",
	//  "started": null,
	//  "ended": null,
	//  "start_waiting": null,
	//  "board_size": 19,
	//  "active_round": null,
	//  "settings": {
	//  "maximum_players": 100,
	//  "num_rounds": 3,
	//  "upper_bar": "20",
	//  "lower_bar": "10",
	//  "active_round": null
	//  },
	//  "rounds": null,
	//  "icon": "https://cdn.online-go.com/5.1/img/default-group-v5.svg",
	//  "scheduled_rounds": false,
	//  "can_administer": true,
	//  "opengotha_standings": null
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
	Black = 'black',
	White = 'white',
	Grey = 'grey',
	Highlight = 'highlight'
}
