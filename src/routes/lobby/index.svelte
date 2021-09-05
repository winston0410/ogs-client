<script context="module" lang="ts">
import { batchFetch } from '../../lib/helper'
import type {IGame} from '$lib/typing'
export const load = async ({ fetch }) => {
 return {
    props: {
        ... (await batchFetch(fetch, { tournament: '/endpoints/tournament', game: '/endpoints/game', notification: '/endpoints/notification' }))
    }
  }
}
import GameHistoryList from '$lib/GameHistoryList.svelte'
import GameCard from '$lib/GameCard.svelte'
import EmptyCard from "$lib/EmptyCard.svelte"
import Heading from '$lib/Heading.svelte'
import NotificationList from "$lib/NotificationList.svelte"
</script>

<script lang="ts">
const currentTime = new Date().getTime()
export let tournament, game, notification
console.log('check tournament', notification)
//  console.log('check notification', notification.value)
const currentGame = game.value.results.find((item: IGame) => !item.ended)
</script>

<svelte:head>
    <title>Smartgo academy</title>
    <meta name="description" content="" />
</svelte:head>

<style>
main{
    padding: var(--md-space);
}

section{
    --section-margin-bottom: var(--md-space);
}

section:not(:last-of-type){
    margin-bottom: var(--section-margin-bottom);
}

@media (min-width: 1200px){
    main{
        padding: var(--xxl-space);
    }
    
    section{
        --section-margin-bottom: var(--xl-space);
    }
}
</style>

<main>
    {#if game.ok }
    <section>
        <Heading>Game in progress</Heading>
    {#if currentGame}
        <GameCard game={currentGame}/>
    {:else}
        <EmptyCard message={"You don't have any game in progress right now."}/>
    {/if}
    </section>
    <section>
    <Heading>Game to play next</Heading>
       <NotificationList notifications={notification}/>
    </section>
    <section>
        <Heading>Last 10 games result</Heading>
        <GameHistoryList games={game} tournaments={tournament}/>
    </section>
    {/if}
</main>
