<script context="module" lang="ts">
import createFetch from 'wrapped-fetch'
import type { UnwrappedResponse } from 'wrapped-fetch'
import type { IGames, IUser } from '$lib/typing';

export const load = async ({ fetch }) => {
    const f = createFetch(fetch)
    const user = await f('/endpoints/user', {}).catch(async (e) => {
      console.log('check e', e, e.status, await e.json())
    })
 return {
    props: {
      user: user,
      games: await f('/endpoints/game', {})
    }
  }
}
</script>

<script lang="ts">
import Header from '$lib/Header.svelte'
import { currentUser, gameList } from "/src/store"
export let user: UnwrappedResponse<IUser>, games: UnwrappedResponse<IGames>
if(user.ok){
    currentUser.set(user.body)
}
if(games.ok){
    gameList.set(games)
}
</script>

<style>
.container{
    padding-top: var(--headerOffset);
}
    
@media (min-width: 1200px) {
    .container{
        padding-top: unset;
        display: grid;
        grid-template-columns: var(--sidebar) var(--main);
    }
}
</style>

<div class="container">
<Header user={$currentUser} gameList={gameList}/>
<slot></slot>
</div>
