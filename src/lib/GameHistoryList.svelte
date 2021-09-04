<script context="module" lang="ts">
import type {LoadOutput, IGames, ITournaments} from '$lib/typing'
</script>

<script lang="ts">
import GameCard from "./GameCard.svelte"

export let games: LoadOutput<IGames>
console.log('check games', games)
export let tournaments: LoadOutput<ITournaments>
</script>

<style>
ul{
    display: flex;
    flex-direction: column;
}

li{
    opacity: 0.6;
}

li:not(:last-of-type){
    margin-bottom: var(--lg-space);
}
</style>

{#if games.ok }
<ul role="list">
    {#each games.value.results.filter(item => item.ended) as game}
            <li>
                <GameCard game={game} />
            </li>
    {/each}
</ul>
{:else}
   <div>
       <span>Something wrong with the server. Please try again later.</span>
   </div>
{/if}
