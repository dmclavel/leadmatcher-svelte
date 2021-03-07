<script>
    import { onMount } from 'svelte';
    import { Route, navigate } from 'svelte-routing';
    import { userData } from '../../store/user';

    export let component;
    export let path;
    export let encapsulation;
    export let isMatching;
    
    onMount(() => {
        if ($userData.username === undefined && encapsulation === 'private' && isMatching) {
            setTimeout(() => navigate('/login', { replace: true }), 300);
        }
    });
</script>

<Route {path} {component} {encapsulation} {isMatching} />