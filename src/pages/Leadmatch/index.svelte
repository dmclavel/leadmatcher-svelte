<script>
    import { navigate } from 'svelte-routing';
    import fetch from '../../config/fetch';
    import { userData, token } from '../../store/user';

    const handleLogout = async () => {
        try {
            await fetch('/user/logout', {
                method: 'DELETE'
            });

            userData.setUserData({});
            token.removeToken();
            setTimeout(() => navigate('/login', { replace: true }), 300);
        } catch (e) {
            console.log(e);
            alert('Cannot logout! Please try again.');
        }
    };
</script>

<div class="flex flex-col items-center m-10">
    <div class="flex items-center">
        <i class="material-icons person-icon">person</i>
        <span class="ml-1 raleway text-lg"> Welcome, {$userData.username || 'user'}! </span>
    </div>
    <div class="flex mt-4">
        <span class="raleway"> Switch account?&nbsp; </span>
        <span on:click|stopPropagation="{handleLogout}" class="raleway link"> Logout </span>
    </div>
</div>

<style>
    .person-icon {
        font-size: 2rem !important;
        color: #054447;
    }

    .raleway {
        font-family: 'Raleway', sans-serif;
    }

    .link {
        text-decoration: underline;
        cursor: pointer;
    }

    .link:hover {
        color: #054447;
        font-weight: 700;
    }
</style>