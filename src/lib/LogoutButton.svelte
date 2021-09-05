<script lang="ts">
import { goto } from '$app/navigation';
export const handleClick = () => {
    goto('/endpoints/logout')
}
</script>

<style>
    button{
        cursor: pointer;
        background: var(--button-background); 
        appearance: none;
        border: none;
        border-radius: var(--sm-radius);
        padding: var(--button-padding);
        color: var(--base-color);
        
    }

    button{
        --button-background: var(--highlight-color);
        --button-padding: var(--xs-space);
    }

    button:hover{
        --button-background: var(--highlight-color-tint1);
    }
        
    @media (min-width: 1200px){
        button{
            --button-padding: var(--sm-space) var(--lg-space);
        }
    }
</style>

<button type="button" on:click={handleClick}>Log out</button>
