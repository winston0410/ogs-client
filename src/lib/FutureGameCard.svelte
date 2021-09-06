<script context="module" lang="ts">
import type {ITournament} from '$lib/typing'
import Heading from '$lib/Heading.svelte'
import Card from '$lib/Card.svelte'
import GameMetaData from '$lib/GameMetaData.svelte'
</script>

<script lang="ts">
export let tournament: ITournament
console.log('future game', tournament, tournament.time_start)
</script>

<style>
</style>

<Card>
<Heading tag={'h3'} size={3} margin={0}>{tournament.name}</Heading>
{#if tournament.description }
<p>{tournament.description}</p>
{/if}
<!--  <GameMetaData handicap={tournament.handicap} width={tournament.board_size} rule={tournament.rules}/>  -->
</Card>
