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

.container{
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
}
</style>

<main class="container">
<slot></slot>
</main>
