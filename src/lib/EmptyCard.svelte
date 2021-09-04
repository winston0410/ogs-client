<script context="module" lang="ts">
import Card from "$lib/Card.svelte"
</script>

<script lang="ts">
export let message: string
</script>

<style>
    div{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: var(--placeholder-height);
    }
        
    div{
        --placeholder-height: 50px;
        --placeholder-width: 100%;
    }

@media (min-width: 1200px){
    div{
        --placeholder-height: 100px;
    }
}
</style>

<Card>
    <div>
        <span>{message}</span>
    </div>
</Card>
