<script context="module" lang="ts">
import { getProps } from '../../lib/helper'
export const load = getProps({ _tournament: '/endpoints/tournament' })
</script>

<script lang="ts">
export let _tournament
export const tournament = _tournament.value
console.log('check tournament', tournament)
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
justify-content: center;
align-items: center;
    }
    .gamelist-list{
        display: flex;
        flex-direction: column;
    }
</style>

<div class="gamelist">
    <div class="gamelist-inner">
    <h1>Games you can join</h1>
    <ul class="gamelist-list" role="list">
    <!--  {#if tournament.length > 0}  -->
        <!--  <button on:click={toggle}>  -->
            <!--  Log out  -->
        <!--  </button>  -->
    <!--  {/if}  -->
	{#each tournament.results as { name, handicap, description }}
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
    </div>
</div>
