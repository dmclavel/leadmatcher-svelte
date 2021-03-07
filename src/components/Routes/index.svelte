<script>
    import { Router, Link } from 'svelte-routing';

    import HomePage from '../../pages/Home/index.svelte'; 
    import SignUpPage from '../../pages/Signup/index.svelte';  
    import LoginPage from '../../pages/Login/index.svelte'; 
    import LeadmatchPage from '../../pages/Leadmatch/index.svelte';
    import PublicRoute from '../PublicRoute/index.svelte';
    import PrivateRoute from '../PrivateRoute/index.svelte';

    export let url = "";
    let pathname = window.location.pathname;
</script>

<Router url="{url}">
    <PublicRoute path="/login" component="{LoginPage}" encapsulation="public" isMatching={/^\/login\/?(\?.*)?$/.test(pathname)} />
    <PublicRoute path="/signup" component="{SignUpPage}" encapsulation="public" isMatching={/^\/signup\/?(\?.*)?$/.test(pathname)} />
    <PublicRoute path="/" component="{HomePage}" encapsulation="public" isMatching={/^\/(\?.*)?$/.test(pathname)} />
    <PrivateRoute path="/leadmatch" component={LeadmatchPage} encapsulation="private" isMatching={/^\/leadmatch\/?(\?.*)?$/.test(pathname)} />
</Router>