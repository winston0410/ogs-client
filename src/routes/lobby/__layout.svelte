<script context="module" lang="ts">
import { getProps } from '../../lib/helper'
export const load = getProps({ user: '/endpoints/user' })
</script>

<script lang="ts">
import Header from '$lib/Header.svelte'
import { currentUser } from "/src/store"
export let user
if(user.ok){
    currentUser.set(user.value)
}
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
<Header user={$currentUser}/>
<slot></slot>
</div>
