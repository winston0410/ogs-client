<script context="module" lang="ts">
import type {IGame, IPlayer} from '$lib/typing'
import {StoneColor} from '$lib/typing'
import PlayerCard from '$lib/PlayerCard.svelte'
import Heading from '$lib/Heading.svelte'
import Stone from '$lib/Stone.svelte'
import Card from '$lib/Card.svelte'
import GameMetaData from '$lib/GameMetaData.svelte'
</script>

<script lang="ts">
export let game: IGame
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
        grid-row-gap: var(--md-space);
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
</style>

<Card>
<a class="game-details" target="_blank" rel="external" href={`https://online-go.com/game/${game.id}`}>
<Heading tag={'h3'} size={3} margin={0}>{game.name}</Heading>
<GameMetaData komi={game.komi} handicap={game.handicap} width={game.width} rule={game.rules}/>
<div class="players-info">
    <PlayerCard color={StoneColor.Black} player={game.players.black} />
    <PlayerCard color={StoneColor.White} player={game.players.white} />
</div>
</a>
</Card>
