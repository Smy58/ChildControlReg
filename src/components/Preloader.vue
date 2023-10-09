<template>
    <div :class="isActive ? 'preloader preloader_active' : 'preloader'">
        <div class="lds-ring"><div></div><div></div><div></div><div></div></div>    
    </div>    
</template>

<script>
export default {
    name: 'Preloader',
    props: {
        isActive: Boolean
    }
}
</script>

<style>
    .preloader {
        background: #000;
        opacity: 0.5;
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: none;
        align-items: center;
        justify-content: center;
    }

    .preloader_active {
        display: flex;
    }

    .lds-ring {
        display: inline-block;
        position: relative;
        width: 250px;
        height: 250px;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 225px;
        height: 225px;
        margin: 15px;
        border: 20px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

</style>