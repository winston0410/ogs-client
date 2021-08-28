<script lang="ts">
import { goto } from '$app/navigation';
export const handleClick = () => {
    goto('/endpoints/logout')
}
</script>

<button type="button" on:click={handleClick}>Log out</button>
