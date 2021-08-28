<script lang="ts">
import LogoutButton from '$lib/LogoutButton.svelte'
export let user
</script>

<style>
    .header{
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
   .header{
        position: static;
        height:100vh;
        flex-direction: column;
        justify-content: unset;
   }
}
</style>

<header class="header">
    <div class="profile">
        <span class="profile-name">{user.username}</span>
        <span class="profile-rank">{Math.floor(user.ranking)}k</span>
    </div>
    <LogoutButton />
</header>
