<script lang="ts">
import { goto } from '$app/navigation';
import Button from '$lib/Button.svelte';
export const handleClick = () => {
    goto('/endpoints/logout')
}
</script>

<Button handleClick={handleClick}>Log out</Button>
