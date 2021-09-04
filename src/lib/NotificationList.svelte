<script context="module" lang="ts">
import EmptyCard from "$lib/EmptyCard.svelte"
import NotificationCard from "$lib/NotificationCard.svelte"
import type {LoadOutput, INotification, ITournamentInvitation} from '$lib/typing'
</script>

<script lang="ts">
export let notifications: LoadOutput<Array<INotification>>
console.log(notifications)
</script>

<style>
ul{
    display: flex;
    flex-direction: column;
}

li:not(:last-of-type){
    margin-bottom: var(--lg-space);
}
</style>

{#if notifications.ok }
{#if notifications.value.length > 1}
<ul class="gamelist-list" role="list">
    {#each notifications.value.filter(item => item.type === "tournamentInvitation") as n}
      <!--  TODO: wait for with statement for refactor  -->
      <!--  type assertion doesn't work?  -->
      <NotificationCard notification={n} />
    {/each}
</ul>
{:else}
    <EmptyCard message={"You don't have any invitation right now"} />
{/if}
{:else}
   <div>
       <span>Something wrong with the server. Please try again later.</span>
   </div>
{/if}
