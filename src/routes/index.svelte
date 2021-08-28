<script context="module" lang="ts">
  export const router = false;
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
import { handleFetchError } from '../lib/fetch'
import { createForm } from 'felte'
import * as yup from 'yup'
import { validator } from '@felte/validator-yup';
import { svelteReporter, ValidationMessage } from '@felte/reporter-svelte';

const schema = yup.object({
name: yup.string().required(),
password: yup.string().required(),
});

const { form } = createForm({
onSubmit: async (values) => {
    fetch(`/endpoints/callback`, {
        method: "POST",
        body: JSON.stringify(values)
    })
    .then(handleFetchError)
    .then((res) => {
        //  goto doesn't work here, as getSession requires a request from server.
        //  redirect to the current page, and let __layout.svelte to take over to redirection
        //  window.location.href = "/"
     })
    .catch((err) => {
       //  set error message here
       console.log('check error', err)
       return err
    })
},
    extend: [validator, svelteReporter],
    validateSchema: schema,
})
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
      flex-direction: column;
      width: 100%;
  }

  .login-form-label{
      display: flex;
      flex-direction: column;
  }

  .input-field, .validation-message{
      --validation-message-height: var(--xxl-space);
  }

  .input-field{
    position: relative;
    margin-bottom: var(--validation-message-height);
  }

  .validation-message{
    height: var(--validation-message-height);
    position: absolute;
    top: 100%;
    left: 0%;
    color: red;
  }
</style>

<div class="login">
    <form class="login-form" use:form>
        <div class="input-field">
        <label class="login-form-label">
        <span>Username</span>
        <input id="name" type="text" name="name" />
        </label>
          <ValidationMessage for="name" let:messages={message}>
            <span id="name-validation" class="validation-message" aria-live="polite">
              {message ?? ""}
            </span>
          </ValidationMessage>
        </div>
        <div class="input-field">
        <label class="login-form-label">
        <span>Password</span>
        <input type="password" id="password" name="password" />
        </label>
          <ValidationMessage for="password" let:messages={message}>
            <span id="password-validation" class="validation-message" aria-live="polite">
              {message ?? ""}
            </span>
          </ValidationMessage>
        </div>
        <button type="submit">Log In</button>
    </form>
</div>
