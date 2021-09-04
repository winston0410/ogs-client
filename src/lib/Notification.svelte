<script context="module" lang="ts">
import { handleFetchError } from '$lib/fetch'
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
export let notification
console.log('check notificaiton', notification)
let isExpired = currentTimestamp > notification.timestamp
//  console.log('check time', isExpired)
</script>

<style>
    .expired{
        opacity: 0.5;
    }
</style>

{#if notification.type === "tournamentInvitation"}
<div class={isExpired && "expired"}>
    <span>{notification.tournamentname}</span>
    {#if isExpired }
    <span class="">
        <span>
        Expired
        </span>
    </span>
    {:else}
    <button class="" on:click={acceptInvitation(notification.requestId)}>
        <span>Accept</span>
    </button>
    {/if}
</div>
{/if}
