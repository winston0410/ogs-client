<script context="module" lang="ts">
import type {IGame, IPlayer, StoneColor} from '$lib/typing'
import endpoints from '/src/endpoints'
import Stone from '$lib/Stone.svelte'
</script>

<script lang="ts">
export let player: IPlayer
export let color: StoneColor
</script>

<style>
    .card{
        display: flex;
    }

    .name{
        margin-left: var(--sm-space);
    }
</style>

<div class="card">
    <Stone color={color} />
    <a class="name" rel="external" href={`${endpoints.domain}/player/${player.id}`}><span>{player.username}({Math.floor(player.ranking)})</span></a>
</div>
