<script context="module">
export async function load({page, session}) {
  if ( page.path !== "/" && !session.accessToken) {
    return { redirect: '/', status: 302 }
  }
  return { props: {} }
}
import '/src/app.css'
</script>

<style>
:global(ul){
    margin: 0;
padding: 0;
}
</style>

<main>
<slot></slot>
</main>
