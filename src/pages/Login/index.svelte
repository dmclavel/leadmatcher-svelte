<script>
    import { navigate } from 'svelte-routing';
    import { Button, TextField } from 'smelte';
    import fetch from '../../config/fetch';
    import { signInAsyncValidate } from '../../utils/validation';
    import { userData, token } from '../../store/user';

    let usernameOrEmail = '';
    let usernameOrEmailError = ''
    let password = '';
    let passwordError = '';
    let serverError = '';

    const resetErrors = () => {
        usernameOrEmailError = '';
        passwordError = '';
        serverError = '';
    };

    const handleFormSubmit = async () => {
        try {
            resetErrors();
            await signInAsyncValidate(usernameOrEmail, password);
            const jsonRes = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usernameOrEmail,
                    password,
                }),
            });
            const response = await jsonRes.json();

            userData.setUserData(response);
            token.setToken(jsonRes.headers.get('user-auth-token'));
            window.localStorage.setItem('x-auth-token', jsonRes.headers.get('user-auth-token'));
            navigate('/leadmatch', { replace: true });
        } catch (e) {
            if (Object.prototype.toString.call(e) === '[object Object]') {
                usernameOrEmailError = e.userOrEmail || '';
                passwordError = e.password || '';
            } else {
                serverError = 'Username / Email and Password do not match our records.';
            }
        }
    };
</script>

<form 
    on:submit|preventDefault="{handleFormSubmit}"
    class="flex flex-col justify-center items-center h-screen"
>
    <TextField label="Username / Email" bind:value={usernameOrEmail} bind:error={usernameOrEmailError} />
    {#if usernameOrEmailError}
        <div class="mt-4"></div>
    {/if}
    <TextField type="password" label="Password" bind:value={password} bind:error={passwordError} />
    {#if passwordError.includes('special')}
        <div class="mt-9"></div>
    {:else}
        <div class="mt-4"></div>
    {/if}
    <Button on:click="{handleFormSubmit}">
        Sign In
    </Button>
    {#if serverError}
        <span class="mt-4 text-error-500"> {serverError} </span>
    {/if}
</form>