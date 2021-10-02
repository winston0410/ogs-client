<script context="module" lang="ts">
export async function load({page, session}) {
  if ( !session.isAdmin) {
    return { redirect: '/lobby', status: 302 }
  }
  return { props: {} }
}
</script>

<script lang="ts">
import { createForm } from 'felte'
import * as yup from 'yup'
import { validator } from '@felte/validator-yup';
import { svelteReporter, ValidationMessage } from '@felte/reporter-svelte';

let submitError = ""

const { form } = createForm({
onSubmit: async (values) => {
    console.log('check value', values)
    const inserted = {
        ...values,
        group: 10004,
        tournament_type: "elimination",
        analysis_enabled: true,
        auto_start_on_max: true,
        //  UNKNOWN:
        base_points: 10,
        //  TODO: get the user data
        //  director: {},
        exclude_provisional: true,
        first_pairing_method: "slide",
        // UNKNOWN: id generated in client?
        id: 0,
        //  UNKNOWN
        lead_time_seconds: 1800,
        // TODO: not sure if these should be moved into form
        max_ranking: "38",
        min_ranking: "5",
        // UNKNOWN
        settings: {
            group_size: "3",
            lower_bar: "10",
            maximum_players: "2",
            num_rounds: "3",
            upper_bar: "20",
        },
        //  TODO: add time to start
        //  time_start: 
        subsequent_pairing_method: "slaughter"
    }
},
    //  extend: [validator, svelteReporter],
    //  validateSchema: schema,
})
</script>

<style>
    .game-setting{
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .game-setting-field{
        display:flex;
        flex-direction: column;
        margin-bottom: var(--xxl-space);
    }
</style>

<svelte:head>
    <title>Smart Go Academy OGS Portal Admin</title>
    <meta name="description" content="" />
</svelte:head>

<!--  Using native DOM element here as no styling is needed  -->
<section>
    <h1>Game coordinator</h1>
    <!--  <div>  -->
        <!--  <ul class="" role="list">  -->
            <!--  <li></li>  -->
        <!--  </ul>  -->
    <!--  </div>  -->
    <form class="game-setting" use:form>
        <label class="game-setting-field">Game name
            <input type="text" id="name" name="name"/>
        </label>
        
        <label class="game-setting-field">Description
            <input type="text" id="description" name="description"/>
        </label>
        
        <label class="game-setting-field">Player to start
            <input type="number" value="2" id="players_start" name="players_start"/>
        </label>
        
        <label class="game-setting-field">Handicap
            <input type="number" value="0" id="handicap" name="handicap"/>
        </label>
        
        <label class="game-setting-field">
        Rule
        <select name="rules" id="rules">
            {#each ["japanese", "chinese", "korean"] as item}
                <option value={item}>
                    {item}
                </option>
            {/each}
        </select>
        </label>
        
        <label class="game-setting-field">
        Exclusivity
        <select name="exclusivity" id="exclusivity">
            {#each ["invite"] as item}
                <option value={item}>
                    {item}
                </option>
            {/each}
        </select>
        </label>
        
        <label class="game-setting-field">
        Board size
        <select name="board_size" id="board_size">
            {#each [9, 13, 19] as boardSize}
                <option selected={boardSize === 19 ? true : false} value={boardSize}>
                    {boardSize}
                </option>
            {/each}
        </select>
        </label>
        
        <button type="submit">Create game</button>
    </form>
</section>
