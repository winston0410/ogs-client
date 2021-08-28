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

let submitError = ""

const { form } = createForm({
onSubmit: async (values) => {
    fetch(`/endpoints/callback`, {
        method: "POST",
        body: JSON.stringify(values)
    })
    .then(handleFetchError)
    .then((res) => {
        submitError = ""
        //  goto doesn't work here, as getSession requires a request from server.
        //  redirect to the current page, and let __layout.svelte to take over to redirection
        window.location.href = "/"
     })
    .catch((err) => {
           if(err.status >= 400 && err.status < 500){
               submitError = "Either your username or password is not correct. Please try again."
           } else {
               submitError = "Something wrong with our server. Please try again later."
           }
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

  .validation, .validation-message{
      --validation-message-height: var(--xxl-space);
  }

  .validation{
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
        <div class="validation">
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
        <div class="validation">
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
        <div class="validation">
        <span class="validation-message">{submitError}</span>
        </div>
    </form>
</div>
