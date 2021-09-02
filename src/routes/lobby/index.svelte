<script context="module" lang="ts">
import { getProps } from '../../lib/helper'
export const load = getProps({ tournament: '/endpoints/tournament', game: '/endpoints/game', notification: '/endpoints/notification' })
</script>

<script lang="ts">
export let tournament, game, notification
console.log('check tournament', tournament.value.results, game.value)
console.log('check notification', notification.value)
import { handleFetchError } from '$lib/fetch'

const acceptInvitation = (id: number) => () => {
    console.log('clicking')
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

<svelte:head>
    <title>Smartgo academy</title>
    <meta name="description" content="" />
</svelte:head>

<style>
    .gamelist{
    display: flex;
    height: 100vh;
    width: 100%;
    align-items: center;
    flex-direction: column;
    }
    .gamelist-list{
        display: flex;
        flex-direction: column;
    }
</style>

<div class="gamelist">
    <section class="inprogress-gamelist">
        <h2>Game in progress</h2>
        {#if tournament.ok }
        <ul class="gamelist-list" role="list">
            {#each tournament.value.results as { name, handicap, description }}
                <li>
                    <div>
                        <span>{name}</span>
                        <!--  <a href={url}>  -->
                            <!--  <span>{url}</span>  -->
                        <!--  </a>  -->
                    </div>
                </li>
            {/each}
        </ul>
        {:else}
           <div>
               <span>Something wrong with the server. Please try again later.</span>
           </div>
        {/if}
    </section>
    
    <section class="future-gamelist">
    <h2>Game to play next</h2>
        {#if notification.ok }
        <ul class="gamelist-list" role="list">
            {#each notification.value as { tournamentname:name, tournamentrqid: requestId, invitingUser, timestamp, type }}
                {#if type === "tournamentInvitation"}
                <li>
                    <div>
                        <span>{name}</span>
                        <button on:click={acceptInvitation(requestId)}>
                            <span>Accept</span>
                        </button>
                    </div>
                </li>
                {/if}
            {/each}
        </ul>
        {:else}
           <div>
               <span>Something wrong with the server. Please try again later.</span>
           </div>
        {/if}
    </section>
</div>
