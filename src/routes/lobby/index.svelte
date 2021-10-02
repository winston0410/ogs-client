<script context="module" lang="ts">
import type {IGame, IGames, ITournaments} from '$lib/typing'
import type { UnwrappedResponse } from 'wrapped-fetch'
import createFetch from 'wrapped-fetch'

export const load = async ({ fetch }) => {
    const f = createFetch(fetch)
    //  auto accept tournament invitation
    f("/endpoints/tournament/notification/auto-accept", {
        method: "PUT"
    }).then(res => {
        console.log('check res', res)
    })

    //  auto join group's tournament
    f("/endpoints/group/tournament/auto-accept", {
        method: "PUT"
    }).then(res => {
        console.log('check group tournament auto accept logic', res)
    })
 return {
    props: {
        tournaments: await f('/endpoints/tournament'),
    }
  }
}
import GameHistoryList from '$lib/GameHistoryList.svelte'
import FutureGameList from '$lib/FutureGameList.svelte'
import GameCard from '$lib/GameCard.svelte'
import EmptyCard from "$lib/EmptyCard.svelte"
import Heading from '$lib/Heading.svelte'
</script>

<script lang="ts">
import { gameList } from "/src/store"
export let tournaments: UnwrappedResponse<ITournaments>
const currentGames: Array<IGame> = $gameList.body?.results.filter((item: IGame) => !item.ended)
</script>

<svelte:head>
    <title>Smart Go Academy OGS Portal</title>
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
    {#if $gameList.ok }
    <section>
        <Heading>Game in progress</Heading>
    {#if currentGames.length > 0}
        {#each currentGames as game}
            <GameCard game={game}/>
        {/each}
    {:else}
        <EmptyCard message={"You don't have any game in progress right now."}/>
    {/if}
    </section>
    <section>
    <Heading>Games to play next</Heading>
        <FutureGameList tournaments={tournaments} />
    </section>
    <section>
        <Heading>Last 10 games result</Heading>
        <GameHistoryList games={$gameList} />
    </section>
    {/if}
</main>
