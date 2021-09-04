<script context="module" lang="ts">
</script>

<script lang="ts">
</script>

<style>
    div{
        box-shadow: 0px 0px 3px 3px #eee;
        padding: var(--sm-space) var(--md-space);
        border-radius: var(--sm-radius);
    }

@media (min-width: 1200px){
    div{
        padding: var(--lg-space) var(--xl-space);
    }
}
</style>

<div>
    <slot></slot>
</div>
