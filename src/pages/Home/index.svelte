<script>
    import { Button } from 'smelte';
</script>

<div class="flex flex-col justify-center items-center hero-block h-screen">
    <h3 class="text-white tracking-wide">
        Analyze your leads.
    </h3>
    <h5 class="text-white my-5 tracking-wide">
        Simplify your lead matching process.
        All you need to do is a quick sign up.
    </h5>
    <Button href="signup" color="fuschia">
        <span class="hero-button tracking-widest">
            Sign Up
        </span>
    </Button>
</div>

<style>
    .hero-block {
        background: no-repeat center url('./images/hero-bg1.jpg');
        font-family: 'Raleway', sans-serif;
    }
    
    .hero-block h3 {
        text-align: center;
        font-size: clamp(1.5rem, 5vw, 3rem) !important;
    }

    .hero-block h5 {
        text-align: center;
        font-size: clamp(1rem, 2.5vw, 1.5rem) !important;
    }

    .hero-button {
        font-size: 1.15rem !important;
        font-family: 'Raleway', sans-serif !important;
    }

    @media (max-width: 768px) {
        .hero-block {
            background: no-repeat center url('./images/hero-bg2.jpg') cover;
            padding: 0 0.5rem;
        }

        .hero-button {
            font-size: 0.8rem !important;
        }
    }
</style>