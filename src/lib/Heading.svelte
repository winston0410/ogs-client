<script lang="ts">
export let color: number = 2
export let size: number = 2
export let margin: number = 2
export let tag: string = "h2"
export const className = `heading color-${color} size-${size} margin-${margin}`
</script>

<style>
    .heading{
        font-size: var(--heading-font-size);
        margin-bottom: var(--heading-margin-b);
    }
        
    .heading {
        --heading-font-size: var(--lg-font);
        --heading-color: var(--highlight-color);
        --heading-margin-b: var(--md-space);
    }
@media (min-width: 1200px){
    .heading{
        --heading-font-size: var(--xl-font);
        --heading-margin-b: var(--lg-space);
    }
}
    .color-3{
    }
        
    .size-3{
        --heading-font-size: var(--md-font);
        --heading-margin-b: var(--sm-space);
    }

    .margin-0{
        --heading-margin-b: 0;
    }
        
@media (min-width: 1200px){
    .size-3{
        --heading-font-size: var(--lg-font);
    }
}
</style>

<!--  Limitation for svelte3 right now, no dynamic tag  -->
{#if tag === "h2"}
<h2 class={className}>
    <slot />
</h2>
{:else if tag === "span"}
<span class={className}>
    <slot />
</span>
{:else if tag === "h3"}
<h3 class={className}>
    <slot />
</h3>
{/if}
