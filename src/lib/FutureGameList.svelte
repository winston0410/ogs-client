<script context="module" lang="ts">
import type {ITournaments, ITournament} from '$lib/typing'
import EmptyCard from "./EmptyCard.svelte"
import FutureGameCard from "./FutureGameCard.svelte"
import type { UnwrappedResponse } from 'wrapped-fetch'
</script>

<script lang="ts">
export let tournaments: UnwrappedResponse<ITournaments>
let futureTournaments: Array<ITournament> = [];
const ts = new Date().getTime()
if(tournaments.ok){
    futureTournaments = tournaments.body.results.filter(item => {
        return ts < new Date(item.time_start).getTime()
    })
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

{#if tournaments.ok }
{#if futureTournaments.length > 0}
<ul role="list">
    {#each futureTournaments as t}
            <li>
                <FutureGameCard tournament={t} />
            </li>
    {/each}
</ul>
{:else}
    <EmptyCard message={"冇之後要舉行嘅對局。"} />
{/if}
{:else}
   <div>
       <span>Something wrong with the server. Please try again later.</span>
   </div>
{/if}
