<script lang="ts">
import LogoutButton from '$lib/LogoutButton.svelte'
import { onMount } from 'svelte';
import resizeObserver from 'svelte-use-resize-observer'
export let user
let height

const handleResize = (e) => {
    const elem = e.detail.entries[0]
    const cr = elem.contentRect
    document.documentElement.style.setProperty('--headerOffset', `${cr.top + cr.bottom}px`);
}
</script>

<style>
    header{
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--sm-space);
        background:  grey;
    }

@media (min-width: 1200px) {
   header{
        position: static;
        height:100vh;
        flex-direction: column;
        justify-content: unset;
   }
}
</style>

<header use:resizeObserver on:resize={handleResize}>
    <div class="profile">
        <span class="profile-name">{user.username}</span>
        <span class="profile-rank">{Math.floor(user.ranking)}k</span>
    </div>
    <LogoutButton />
</header>
