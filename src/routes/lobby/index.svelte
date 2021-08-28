<svelte:head>
    <title>Smartgo academy</title>
    <meta name="description" content="" />
</svelte:head>

<style>
    .gamelist{
        display: flex;
height: 100vh;
width: 100%;
justify-content: center;
align-items: center;
    }
    .gamelist-list{
        display: flex;
        flex-direction: column;
    }
</style>

<div class="gamelist">
    <div class="gamelist-inner">
    <h1>Games you can join</h1>
    <ul class="gamelist-list" role="list">
	{#each [{ url: "test"}, { url: "test2"}] as { url }}
		<li>
            <div>
                <a href={url}>
                    <span>{url}</span>
                </a>
            </div>
        </li>
	{/each}
    </ul>
    </div>
</div>
