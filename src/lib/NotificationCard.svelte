<script context="module" lang="ts">
import { handleFetchError } from '$lib/fetch'
import type {ITournamentInvitation, INotification} from '$lib/typing'
import Card from "$lib/Card.svelte"
const acceptInvitation = (id: number) => () => {
    fetch('/endpoints/tournament/notification', {
        method: "POST",
        body: JSON.stringify({
            request_id: id
        })
    }).then(handleFetchError).then(res => {
        console.log('check res', res)
    }).catch(e => {
        //issue, handle missed tournament
        console.log('check e', e)
    })
}
</script>

<script lang="ts">
const currentTimestamp = new Date().getTime()
export let notification :ITournamentInvitation
    console.log('chcek type', notification)
const isExpired = (currentTimestamp > notification.timestamp) ? true : false;
</script>

<style>
.expired{
    opacity: var(--opacity-3);
}
</style>

<li class={isExpired && "expired"}>
<Card>
<div>
    <span>{notification.tournamentname}</span>
    {#if !isExpired }
    <button class="" on:click={acceptInvitation(notification.tournamentrqid)}>
        <span>Accept</span>
    </button>
    {/if}
</div>
</Card>
</li>

