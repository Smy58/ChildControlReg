<template>
    <MainForm :setPreloaderActive="setPreloaderActive" :setPreloaderUnActive="setPreloaderUnActive"/>
    <Preloader :isActive='isLoad'/>
</template>

<script>
    import MainForm from './components/MainForm.vue'
    import Preloader from './components/Preloader.vue'


    export default {
        name: 'App',
        components: {
            MainForm,
            Preloader
        },
        data() {
            return {
                isLoad: false

            }
        },
        methods: {
            setPreloaderActive() {
                this.isLoad = true;
                console.log('preloaderStatus: ' + this.isLoad)
            },
            setPreloaderUnActive() {
                this.isLoad = false;
                console.log('preloaderStatus: ' + this.isLoad)

            }
        }

    }
</script>

<style>
@import url(./assets/fonts/Inter/stylesheet.css);
@import url(./assets/fonts/Golos/stylesheet.css);

#app {
  width: 100%;
}

body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  align-items: center;
}
</style>
