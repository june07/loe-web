<template>
    <v-toolbar width="70%" flat class="mb-4">
        <v-toolbar-title class="d-flex justify-center">
            <svg
                 aria-hidden="true"
                 focusable="false"
                 data-prefix="fas"
                 data-icon="less-than-equal"
                 class="svg-inline--fa fa-less-than-equal fa-w-14 mx-3"
                 role="img"
                 xmlns="http://www.w3.org/2000/svg"
                 width="32"
                 height="32"
                 viewBox="0 0 448 512">
                <path
                      stroke="black"
                      fill="black"
                      d="M54.98 214.2l301.41 119.87c18.39 6.03 38.71-2.54 45.38-19.15l12.09-30.08c6.68-16.61-2.82-34.97-21.21-41l-175.44-68.05 175.56-68.09c18.29-6 27.74-24.27 21.1-40.79l-12.03-29.92c-6.64-16.53-26.86-25.06-45.15-19.06L54.98 137.89C41.21 142.41 32 154.5 32 168.07v15.96c0 13.56 9.21 25.65 22.98 30.17zM424 400H24c-13.25 0-24 10.74-24 24v48c0 13.25 10.75 24 24 24h400c13.25 0 24-10.75 24-24v-48c0-13.26-10.75-24-24-24z"></path>
            </svg>
            <span>LOE Account</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu v-if="$auth.isAuthenticated" offset-y>
            <template v-slot:activator="{ on }">
                <v-btn :x-small="$vuetify.breakpoint.mobile" icon v-on="on">
                    <v-avatar style="border-radius:10px" v-if="$auth.isAuthenticated">
                        <img v-if="!$vuetify.breakpoint.mobile" :src="$auth.user.picture" :alt="$auth.user.name" />
                    </v-avatar>
                    <v-icon v-if="$auth.isAuthenticated" :small="$vuetify.breakpoint.mobile">mdi-chevron-down</v-icon>
                    <v-icon v-if="!$auth.isAuthenticated" to="/dashboard" :small="$vuetify.breakpoint.mobile" large>mdi-play</v-icon>
                </v-btn>
            </template>
            <v-list dense>
                <v-subheader>{{ $auth.user.email }}</v-subheader>
                <v-list-item v-if="$auth.isAuthenticated" @click="logout">
                    <v-list-item-icon>
                        <v-icon>mdi-power</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Sign Out</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
export default {
    name: "NavBar",
    components: {},
    data() {
        return {};
    },
    methods: {
        login() {
            this.$auth.loginWithRedirect({
                appState: { targetUrl: "/account" },
            });
        },
        logout() {
            this.$auth.logout();
            this.$router.push({ path: "/" });
        },
    },
};
</script>

<style>
#mobileAuthNavBar {
    min-height: 125px;
    justify-content: space-between;
}
</style>