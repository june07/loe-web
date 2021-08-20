<template>
    <v-app id="app">
        <nav-bar v-if="$route.path !== '/'" class="align-self-center" />
        <v-main class="align-self-center" v-bind:style="{ width: $route.path !== '/' ? '70%' : '100%' }" style="padding: 0">
            <v-container
                :fluid="$route.path === '/'" v-bind:class="{ 'pa-0': $route.path === '/'}">
                <error />
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>
<style scoped>

</style>
<script>
import NavBar from "./components/NavBar";
import Error from "./components/Error";

export default {
    components: {
        NavBar,
        Error,
    },
};
</script>