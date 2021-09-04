<script context="module" lang="ts">
import { getProps } from '../../lib/helper'
export const load = getProps({ tournament: '/endpoints/tournament', game: '/endpoints/game', notification: '/endpoints/notification' })
import Notification from '$lib/Notification.svelte'
import GameHistoryList from '$lib/GameHistoryList.svelte'
import GameCard from '$lib/GameCard.svelte'
import Heading from '$lib/Heading.svelte'
</script>

<script lang="ts">
const currentTime = new Date().getTime()
export let tournament, game, notification
console.log('check tournament', game)
//  console.log('check notification', notification.value)
</script>

<svelte:head>
    <title>Smartgo academy</title>
    <meta name="description" content="" />
</svelte:head>

<style>
main{
padding: 0 var(--sm-space);
}

section{
    margin-top: var(--md-space);
}

@media (min-width: 1200px){
    main{
        padding: 0 var(--xxl-space);
    }
}
</style>

<main>
    {#if game.ok }
    <section>
        <Heading>Game in progress</Heading>
        <GameCard game={game.value.results.find(item => !item.ended)}/>
    </section>
    <section>
        <Heading>Last 10 games result</Heading>
        <GameHistoryList games={game} tournament={tournament}/>
    </section>
    {/if}
    
    <section>
    <Heading>Game to play next</Heading>
        {#if notification.ok }
        <ul class="gamelist-list" role="list">
            {#each notification.value as n}
                <li>
                      <Notification notification={n} />
                </li>
            {/each}
        </ul>
        {:else}
           <div>
               <span>Something wrong with the server. Please try again later.</span>
           </div>
        {/if}
    </section>
</main>
