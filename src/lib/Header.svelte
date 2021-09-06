<script context="module" lang="ts">
import LogoutButton from '$lib/LogoutButton.svelte'
import Heading from '$lib/Heading.svelte'
import endpoints from "/src/endpoints";
import resizeObserver from 'svelte-use-resize-observer'
import type { IUser } from '$lib/typing';
import { getRanking } from '$lib/helper';
</script>

<script lang="ts">
export let user: IUser

const handleResize = (e) => {
    const elem = e.detail.entries[0]
    const cr = elem.contentRect
    document.documentElement.style.setProperty('--headerOffset', `${cr.top + cr.bottom}px`);
}

const getLargeIconUrl = (url: string):string => {
    if(!url){
        return ""
    }
    const modifiedUrl = new URL(url);
    if(modifiedUrl.host !== "secure.gravatar.com"){
        return url
    }
    modifiedUrl.searchParams.set("s", "256")
    return modifiedUrl.toString()
}

</script>

<style>
    .container{
        width: fit-content;
    }
        
        
    img{
        max-width: 32px;
        height: auto;
        border-radius: 3%;
    }

    .profile{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .profile{
        --profile-item-margin: var(--sm-space);
    }

    .profile *:not(:last-child){
        margin-right: var(--profile-item-margin);
    }
        
    header{
        position: fixed;
        left: 0px;
        right: 0px;
        top: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--sm-space);
        background: var(--base-color-shade1);
        box-shadow: 0px 0px 5px 1px var(--base-color-shade1);
        z-index: 99;
    }

@media (min-width: 1200px) {
    img{
        max-width:200px;
        width:100%;
        height: auto;
    }
        
    .container{
        width: 100%;
    }
        
    .profile{
        --profile-item-margin: var(--lg-space);
    }
        
    .profile{
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
        
    .profile *:not(:last-child){
        margin-right: 0px;
        margin-bottom: var(--profile-item-margin);
    }
        
   header{
        position: sticky;
        top: 0px;
        align-self: start;
        flex-direction: column;
        padding-bottom: calc(var(--sm-space) + var(--sectionYpadding));
        height: 100vh;
        padding: var(--xxl-space) 0;
        justify-content: space-between;
   }
}
</style>

<header use:resizeObserver on:resize={handleResize}>
    <div class="container">
        <a class="profile" target="_blank" rel="external" href={`${endpoints.domain}/user/view/${user.id}`} alt={`Profile for ${user.username}`}>
            <img src={getLargeIconUrl(user.icon)} alt={`Icon for ${user.username}`} />
            <Heading tag="span" margin={0} size={3}>{user.username}({getRanking(user.ranking)})</Heading>
        </a>
    </div>
    <LogoutButton />
</header>
