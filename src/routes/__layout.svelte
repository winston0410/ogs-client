<script context="module">
export async function load({page, session}) {
  if ( page.path !== "/" && !session.accessToken) {
    return { redirect: '/', status: 302 }
  }
  
  const currentTimestamp = new Date().getTime()
  if (currentTimestamp > parseInt(session.expiresIn)){
      //Fetch with refresh token
      //  TODO: unhandled
      fetch("/endpoints/callback", {
            method: "POST",
            body: JSON.stringify({
                name: session.username,
                refreshToken: session.refreshToken
            })
      }).then(res => {
      console.log(res)
      //  force reload
      window.location.href = "/"
      }).catch(e => {
      return fetch("/endpoints/logout")
      })
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

:global(input){
    padding: 0;
}

:global(body){
    font-family: var(--content-font);
}

.container{
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    position: relative
}
</style>

<main class="container">
<slot></slot>
</main>
