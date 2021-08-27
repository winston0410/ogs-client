<script context="module" lang="ts">
import { getProps } from '../../lib/helper'
export const load = getProps({ _user: '/endpoints/user', _group: '/endpoints/group', _game: '/endpoints/game' })
</script>

<script lang="ts">
export let _user
export const user = _user.value
//  console.log('check user value', user)
</script>

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
	{#each [{ url: "test"}, { url: "test2"}] as { url }}
		<li>
            <div>
                <a href={url}>
                    <span>{url}</span>
                </a>
            </div>
        </li>
	{/each}
    </ul>
    </div>
</div>
