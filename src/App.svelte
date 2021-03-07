<script>
	import { onMount } from 'svelte';
	import { userData, token } from './store/user';
	import fetch from './config/fetch';
	import Routes from './components/Routes/index.svelte';

	let authenticating = true;

	onMount(async () => {
		try {
			const jsonRes = await fetch('/user');

			if (jsonRes.status === 401) {
				window.localStorage.removeItem('x-auth-token');
			} else {
				const response = await jsonRes.json();

				token.setToken(window.localStorage.getItem('x-auth-token'));
				userData.setUserData(response);
			}
		} catch (e) {
			console.log(`Error on authentication: ${e}`);
			window.localStorage.removeItem('x-auth-token');
		}

		authenticating = false;
	});
</script>

{#if authenticating}
	<p> Authenticating... </p>
{:else}
	<Routes />
{/if}