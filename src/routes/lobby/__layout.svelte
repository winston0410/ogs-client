<script context="module" lang="ts">
import { getProps } from '../../lib/helper'
export const load = getProps({ user: '/endpoints/user' })
</script>

<script lang="ts">
import Header from '$lib/Header.svelte'
export let user
</script>

<style>
.container{
    padding-top: var(--headerOffset);
}
    
@media (min-width: 1200px) {
    .container{
        padding-top: unset;
        display: grid;
        grid-template-columns: var(--sidebar) var(--main);
    }
}
</style>

<div class="container">
<Header user={user.ok ? user.value : {}}/>
<slot></slot>
</div>
