<script>
    import { navigate } from 'svelte-routing';
    import { TextField, Button } from 'smelte';
    import fetch from '../../config/fetch';
    import { signUpAsyncValidate } from '../../utils/validation';
    import { userData, token } from '../../store/user';

    let username = '';
    let usernameError = '';
    let email = '';
    let emailError = '';
    let password = '';
    let passwordError = '';
    let serverError = null;

    const resetErrorMessages = () => {
        usernameError = '';
        emailError = '';
        passwordError = '';
        serverError = '';
    };

    const handleFormSubmit = async () => {
        try {
            resetErrorMessages();
            await signUpAsyncValidate(username, email, password);
            const jsonRes = await fetch('/user/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });
            const response = await jsonRes.json();

            
            if (typeof response.message === 'string') { // Server Error
                serverError = response.message;
            } else {
                userData.setUserData(response);
                token.setToken(jsonRes.headers.get('user-auth-token'));
                window.localStorage.setItem('x-auth-token', jsonRes.headers.get('user-auth-token'));
                navigate('/leadmatch?registered=true', { replace: true });
                
            }
        } catch (e) {
            console.log(e);
            if (Object.prototype.toString.call(e) === '[object Object]') {
                usernameError = e.username || '';
                emailError = e.email || '';
                passwordError = e.password || '';
            }
        }
    };
</script>

<form 
    on:submit|preventDefault="{handleFormSubmit}"
    class="flex flex-col justify-center items-center h-screen"
>
    <TextField label="Username" bind:value={username} bind:error={usernameError} />
    <div class="mt-3"></div>
    <TextField type="email" label="Email Address" bind:value={email} bind:error={emailError} />
    <div class="mt-3"></div>
    <TextField type="password" label="Password" bind:value={password} bind:error={passwordError} />
    {#if passwordError.includes('special')}
        <div class="mt-12"></div>
    {:else}
        <div class="mt-3"></div>
    {/if}
    <Button on:click="{handleFormSubmit}">
        Sign Up
    </Button>
    {#if serverError}
        <p class="mt-4 text-error-500"> {serverError} </p>
    {/if}
</form>