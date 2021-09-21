<script context="module" lang="ts">
import '/src/app.css'
export async function load({page, session, fetch}) {
  if ( page.path === "/"){
      return { props: {} }
  }
  if ( !session.accessToken) {
    return { redirect: '/', status: 302 }
  }

  if ( new Date().getTime() >= parseInt(session.expiresIn)) {
    return { redirect: '/', status: 302 }
  }
  
  //  const currentTimestamp = new Date().getTime()
  //  if (currentTimestamp > parseInt(session.expiresIn)){
      //  //Fetch with refresh token
      //  //  TODO: unhandled
      //  fetch("/endpoints/callback", {
            //  method: "POST",
            //  body: JSON.stringify({
                //  name: session.username,
                //  refreshToken: session.refreshToken
            //  })
      //  }).catch((e) => {
      //  console.log(e)
      //  })
      //  .then(res => {
      //  //  console.log(res)
      //  //  force reload
      //  //  window.location.href = "/"
      //  }).catch(e => {
      //  console.log('check e', e)
      //  //  return fetch("/endpoints/logout")
      //  })
  //  }
  return { props: {} }
}
</script>

<style>
:global(a) {
   color: var(--highlight-color);
   text-decoration: none;
}
    
:global(a:hover) {
   color: var(--highlight-color-tint1);
}
    
:global(ul){
    margin: 0;
    padding: 0;
}
    
:global(h1,h2,h3,h4,h5,h6){
    line-height: 1;
}

:global(input){
    padding: 0;
}

:global(body){
    font-family: var(--content-font);
}

.container{
    max-width: var(--container-width);
    margin-left: auto;
    margin-right: auto;
    position: relative
}
</style>

<div class="container">
<slot></slot>
</div>
