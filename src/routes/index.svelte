<script context="module" lang="ts">
  export async function load({ session }) {
    const isAdmin = !!parseInt(session.isAdmin)
    
    if(session.accessToken){
        if(isAdmin){
            return { redirect: '/admin', status: 302 }
        } else {
            return { redirect: '/lobby', status: 302 }
        }
    }
    
    return {}
  }

</script>

<script lang="ts">
import { goto } from '$app/navigation';
//  TODO: Fix typing later
const handleSubmit = (e :any) => {
    const formData = new FormData(e.target)

    //  TODO:Validate username and password
    //  fetch(`/endpoints/callback`, {
        //  method: "POST",
        //  body: formData
    //  })
    //  .then((res) => {
        //  console.log('success')
     //  })
    //  .catch((err) => {
       //  return err
    //  })
    
    e.target.submit()
}
</script>

<svelte:head>
    <title>Smartgo academy</title>
</svelte:head>

<style>
  .login{
height: 100vh;
width: 100%;
display: flex;
  justify-content: center;
  align-items: center;
   }

  .login-form{
      display: flex;
      justify-content: center;
      row-gap: 8px;
      flex-direction: column;
  }

  .login-form-label{
      display: flex;
      flex-direction: column;
  }
</style>

<div class="login">
    <form action="/endpoints/callback" method="POST" class="login-form" on:submit|preventDefault={handleSubmit}>
        <label class="login-form-label">
        <span>Username</span>
        <input type="text" name="name" />
        </label>
        <label class="login-form-label">
        <span>Password</span>
        <input type="password" name="password" />
        </label>
        <button type="submit">Log In</button>
    </form>
</div>
