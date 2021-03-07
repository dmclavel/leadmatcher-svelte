<script>
    import { onMount } from 'svelte';
    import { Route, navigate } from 'svelte-routing';
    import { userData, token } from '../../store/user';

    export let component;
    export let path;
    export let encapsulation;
    export let isMatching;

    onMount(() => {
        if ($userData.username !== undefined && $token && encapsulation === 'public' && isMatching) {
            setTimeout(() => navigate('/leadmatch', { replace: true }), 300);
        }
    });
</script>

<Route {path} {component} {encapsulation} {isMatching} />