const domain = "https://online-go.com"

export default {
    domain: domain,
    group: `${domain}/api/v1/megroups`,
    game: `${domain}/api/v1/megames`,
    user: `${domain}/api/v1/me`,
    notification: `${domain}/api/v1/menotifications`,
    getTournament: `${domain}/api/v1/metournaments`,
    postTournament: `${domain}/api/v1/tournament`,
    joinTournament: `${domain}/api/v1/me/tournaments/invitations`,
    accessToken: `${domain}/oauth2/token/`
}
