<script context="module">
export async function load({page, session}) {
  if ( page.path !== "/" && !session.user) {
    return { redirect: '/', status: 302 }
  }
  return { props: {} }
}
import '/src/app.css'
</script>

<style>

</style>

<main>
<slot></slot>
</main>
