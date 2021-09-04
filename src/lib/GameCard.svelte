<script context="module" lang="ts">
import type {IGame, IPlayer} from '$lib/typing'
import {StoneColor} from '$lib/typing'
import PlayerCard from '$lib/PlayerCard.svelte'
import Heading from '$lib/Heading.svelte'
import Stone from '$lib/Stone.svelte'
</script>

<script lang="ts">
export let game: IGame
    console.log('check game in game card', game)
let isEnded: boolean = !game.ended
console.log(isEnded)
const getWinner = (game: IGame) => {
    if(game.black_lost && !game.white_lost){
        return StoneColor.White;
    }

    if(!game.black_lost && game.white_lost){
        return StoneColor.Black;
    }

    return StoneColor.Grey
}
</script>

<style>
    .game-details{
        display: grid;
        grid-template-columns: minmax(0, 100%) 75px;
        box-shadow: 0px 0px 3px 3px #eee;
        padding: var(--sm-space) var(--md-space);
        border-radius: var(--sm-radius);
    }

    .players-info{
        grid-column: 1;
        display: grid;
        grid-row-gap: var(--sm-space);
    }

    .join-button-text{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--base-contrast-color);
        pointer-events: none;
    }
        
    .result-container{
        --stone-width: 65px;
        --stone-height: 65px;
    }
        
    @media (min-width: 1200px){
        .result-container{
            --stone-width: 100px;
            --stone-height: 100px;
        }
    }

    .result-container{
        grid-column: 2;
        grid-row: 1/3;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

@media (min-width: 1200px){
    .game-details{
        padding: var(--lg-space) var(--xl-space);
    }
}
</style>

<div class="game-details">
    <Heading size={3}>{game.name}</Heading>
    <div class="players-info">
        <PlayerCard color={StoneColor.Black} player={game.players.black} />
        <PlayerCard color={StoneColor.White} player={game.players.white} />
    </div>
    {#if !game.ended }
    <a class="result-container" target="_blank" rel="external" href={`https://online-go.com/game/${game.id}`}>
        <Stone color={StoneColor.Highlight}/>
        <span class="join-button-text">Join</span>
    </a>
    {:else}
    <div class="result-container">
        <Stone color={getWinner(game)}/>
    </div>
    {/if}
</div>
