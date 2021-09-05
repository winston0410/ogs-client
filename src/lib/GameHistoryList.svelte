<script context="module" lang="ts">
import type {LoadOutput, IGames, IGame, ITournaments} from '$lib/typing'
import EmptyCard from "./EmptyCard.svelte"
import GameCard from "./GameCard.svelte"
</script>

<script lang="ts">
export let games: LoadOutput<IGames>
let playedGames: Array<IGame> = [];
if(games.ok){
    playedGames = games.value.results.filter(item => item.ended)
}
</script>

<style>
ul{
    display: flex;
    flex-direction: column;
}

li{
    opacity: var(--opacity-3);
}

li:not(:last-of-type){
    margin-bottom: var(--lg-space);
}
</style>

{#if games.ok }
{#if playedGames.length > 1}
<ul role="list">
    {#each playedGames.filter(item => item.ended).reverse().slice(0, 9) as game}
            <li>
                <GameCard game={game} />
            </li>
    {/each}
</ul>
{:else}
    <EmptyCard message={"You haven't played any game yet."} />
{/if}
{:else}
   <div>
       <span>Something wrong with the server. Please try again later.</span>
   </div>
{/if}
