<template>
    <div style=" width:100%; background-color: #EFF2F3 !important; height: 100%">
       <router-view></router-view>
    </div>
</template>

<script>
    import { loadCache } from './store'
    import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
    export default {
        created() {
            loadCache()
        }
    }
</script>

<style>
  
</style>