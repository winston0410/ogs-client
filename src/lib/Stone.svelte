<script context="module" lang="ts">
import  { StoneColor } from '$lib/typing'
</script>

<script lang="ts">
export let color: StoneColor
</script>

<style>
.black-stone{
    fill: var(--stone-black-color);
}
    
.white-stone{
    fill: var(--stone-white-color);
}
    
.grey-stone{
    fill: var(--stone-grey-color);
}
    
.highlight-stone{
    --stone-hover-color: var(--highlight-color-tint1);
    fill: var(--stone-highlight-color);
}

svg{
    width: var(--stone-width);
    height: var(--stone-height);
}

circle:hover{
    fill: var(--stone-hover-color);
}
</style>

<svg viewBox="0 0 50 50" width="25" height="25">
      <title>Stone for Go</title>
      <desc>Stones that is used in Go, {color} stone</desc>
      <circle class={`${color}-stone`} cx="25" cy="25" r="25" />
</svg>
