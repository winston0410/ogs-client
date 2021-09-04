<script lang="ts">
export let komi: string
export let handicap: number
export let width: number
export let rule: string
</script>

<style>
    ul{
        display: flex;
        flex-wrap: wrap;
    }

    li{
        color: grey;
    }

    li:not(:last-of-type){
        margin-right: var(--sm-space);
    }
</style>

<ul role="list">
    <li>Komi: {komi}</li>
    <li>Handicap: {handicap}</li>
    <li>Board: {width}x{width}</li>
    <li>Rule: {rule}</li>
</ul>
