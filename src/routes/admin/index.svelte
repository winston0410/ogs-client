<script context="module" lang="ts">
export async function load({page, session}) {
  if ( !session.isAdmin) {
    return { redirect: '/lobby', status: 302 }
  }
  return { props: {} }
}
</script>

<script lang="ts">
</script>

<style>
</style>

<svelte:head>
    <title>Smartgo academy</title>
    <meta name="description" content="" />
</svelte:head>

<section>
    <h1>Game coordinator</h1>
    <div>
        <ul class="" role="list">
            <li></li>
        </ul>
    </div>
</section>
