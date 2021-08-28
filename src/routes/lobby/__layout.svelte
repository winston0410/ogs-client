<script context="module" lang="ts">
import { getProps } from '../../lib/helper'
export const load = getProps({ _user: '/endpoints/user', _group: '/endpoints/group', _game: '/endpoints/game' })
</script>

<script lang="ts">
import Header from '$lib/Header.svelte'
export let _user
export const user = _user.value
console.log('check user value', user)
</script>

<style>
@media (min-width: 1200px) {
    .container{
        display: grid;
        grid-template-columns: var(--sidebar) var(--main);
    }
}
</style>

<div class="container">
<Header user={user}/>
<slot></slot>
</div>
