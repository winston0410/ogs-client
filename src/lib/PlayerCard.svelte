<script context="module" lang="ts">
import type {IPlayer, StoneColor} from '$lib/typing'
import { getRanking } from '$lib/helper'
import endpoints from '/src/endpoints'
import Stone from '$lib/Stone.svelte'
</script>

<script lang="ts">
import { currentUser } from "/src/store"
export let player: IPlayer
export let color: StoneColor
const matched = $currentUser.username === player.username
</script>

<style>
    .card{
        display: flex;
    }

    .name{
        margin-left: var(--sm-space);
    }

    .current{
        font-weight: 700;
    }
</style>

<div class="card">
    <Stone color={color} />
    <a class={`name ${matched ? "current" : ""}`} rel="external" href={`${endpoints.domain}/player/${player.id}`}><span>{player.username}({getRanking(player.ranking)})</span></a>
</div>
