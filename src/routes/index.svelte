<script context="module" lang="ts">
  export async function load({ session }) {
    if(session.user){
        return { redirect: '/roster', status: 302 }
    }
    return {}
  }

</script>

<script lang="ts">
//  TODO: Fix typing later
const handleSubmit = (e :any) => {
    const formData = new FormData(e.target)
    
    //  TODO:Validate username and password
    fetch(`/endpoints/callback`, {
        method: "POST",
        body: formData
    })
    .then((res) => {
       return res.json()
     })
    .catch((err) => {
       console.log('check err', err)
       return err
    })
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
    <form class="login-form" on:submit|preventDefault={handleSubmit}>
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
