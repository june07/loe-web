<template>
    <v-app>
        <v-toolbar
                   color="amber lighten-2"
                   flat>
            <div class="d-flex align-center">
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

                <stylized-name class="ml-2"></stylized-name>
            </div>
            <v-spacer />
            <v-menu v-if="$auth.isAuthenticated" left :offset-x="!$vuetify.breakpoint.mobile" :offset-y="$vuetify.breakpoint.mobile" :nudge-left="$vuetify.breakpoint.mobile ? 0 : '20px'" nudge-top="0px">
                <template v-slot:activator="{ on, attrs }">
                    <sup class="font-weight-light text-h4 login-icon"
                         v-bind="attrs"
                         v-on="on">
                        ≤
                    </sup>
                </template>
                <v-list dense color="rgba(255, 255, 255, 0)">
                    <v-list-item dense class="font-weight-light text-h6 menu-text d-flex justify-center" to="/account">accOunt</v-list-item>
                    <v-list-item dense class="font-weight-light text-h6 menu-text d-flex justify-center" @click="logout">lOgOut</v-list-item>
                </v-list>
            </v-menu>
            <a v-if="!$auth.isAuthenticated" @click="login" class="link font-weight-light text-h4"><sup>></sup></a>
        </v-toolbar>

        <v-main>
            <v-container fluid id="sheet1" class="pb-16">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex justify-center" v-if="$vuetify.breakpoint.mobile" cols="12">
                        <v-img max-width="500" src="https://res.cloudinary.com/june07/image/upload/v1629145980/shopping-cart-shopping-purchasing-candy-alpha_olfd3o.png">
                        </v-img>
                    </v-col>
                    <v-col class="d-flex flex-column justify-center" :cols="$vuetify.breakpoint.mobile ? 12 : 5">
                        <v-card
                                color="amber lighten-2"
                                class="ml-8"
                                outlined>

                            <v-card-title class="mb-1 text-sm-h5 text-md-h3 text-lg-h1">
                                <span v-bind:class="$vuetify.breakpoint.mobile ? 'font-weight-light' : ''" class="mobile-br nowrap">Amazon shopping,</span>
                                <span class="font-weight-bold nowrap">Intelligently</span>
                            </v-card-title>
                            <v-card-text v-bind:class="$vuetify.breakpoint.mobile ? 'subtitle-2': 'subtitle-1'" class="my-8">Stop searching through your Amazon order history, guessing, or just plain giving up on being informed about what you previously paid for things.
                                Instead let LOE do the work for you with it's intelligent algorithms, instantaneous data delivery, and smart UI.</v-card-text>

                            <v-card-actions>
                                <v-btn x-large dark elevation="0"
                                       :href="extensionLink"
                                       color="amber darken-2"
                                       class="px-8">
                                    <span class="m">Add to {{ isEdge ? 'Edge' : 'Chrome' }} - It's Free</span>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col v-if="!$vuetify.breakpoint.mobile" cols="5">
                        <v-img src="https://res.cloudinary.com/june07/image/upload/v1629145980/shopping-cart-shopping-purchasing-candy-alpha_olfd3o.png">
                        </v-img>
                    </v-col>
                </v-row>
            </v-container>
            <v-container fluid id="sheet2" :class="$vuetify.breakpoint.mobile ? '' : 'pb-16'">
                <v-row>
                    <v-col :cols="$vuetify.breakpoint.mobile ? 0 : 6" class="d-flex justify-center align-center">
                    </v-col>
                    <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 6">
                        <v-subheader class="justify-center">Web Browser Extension</v-subheader>
                        <v-img class="justify-center" max-height="1080" contain src="img/screenshare-extensionExample.gif"></v-img>
                    </v-col>
                    <!-- mobile has this duplicated in the same row -->
                    <v-col v-if="$vuetify.breakpoint.mobile" class="d-flex justify-center align-start">
                        <v-card elevation="12" color="amber accent-1 mb-12" shaped>
                            <v-card-title class="text-h5 justify-center mb-4">Web Browser Extension</v-card-title>
                            <v-card-subtitle class="text-subtitle-2 font-italic justify-center">
                                Available for all Chromium based browsers including Edge, Chrome, Opera, and more.
                            </v-card-subtitle>
                            <v-card-text class="text-body-1">
                                The LOE browser extension is available at both <a href="">Google's Web Store</a> and <a href="https://microsoftedge.microsoft.com/addons/detail/loe/ggpmndmjelbgjcjanbpdaiigfeacgbji">Microsoft's Edge Add-ons</a>. It provides real-time Amazon shopping data from your prior purchase history.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <!-- mobile has this duplicated in the same row -->
                </v-row>
                <v-row>
                    <v-col :cols="$vuetify.breakpoint.mobile ? 0 : 6" style="margin-top: -10%">
                        <v-subheader class="justify-center">Quick Price History on Mobile App</v-subheader>
                        <v-img class="justify-center" max-height="1080" contain src="img/screenshare-pwaExample-wide.gif"></v-img>
                    </v-col>
                    <!-- mobile has this duplicated in the same row -->
                    <v-col v-if="!$vuetify.breakpoint.mobile" cols="6" class="d-flex justify-center align-start">
                        <v-card color="amber accent-1" shaped class="mx-16 px-16" style="max-width: 70%">
                            <v-card-title class="font-weight-light text-md-h4 justify-center mb-4">Web Browser Extension</v-card-title>
                            <v-card-subtitle class="text-subtitle-2 justify-center">
                                Available for all Chromium based browsers including Edge, Chrome, Opera, and more.
                            </v-card-subtitle>
                            <v-card-text class="text-body-1">
                                The LOE browser extension is available at both <a href="https://chrome.google.com/webstore/detail/loe/nielhlpokoneeolkilpbkafnaimmmmdc">Google's Web Store</a> and <a href="https://microsoftedge.microsoft.com/addons/detail/loe/ggpmndmjelbgjcjanbpdaiigfeacgbji">Microsoft's Edge Add-ons</a>. It provides real-time Amazon shopping data from your prior purchase history.
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <!-- mobile has this duplicated in the same row -->
                </v-row>
                <v-row>
                    <!-- mobile has this duplicated in the same row -->
                    <v-col v-if="!$vuetify.breakpoint.mobile" :cols="$vuetify.breakpoint.mobile ? 12 : 6" class="d-flex justify-center align-start">
                        <v-card color="amber accent-1" shaped class="mx-16 px-16" style="max-width: 60%">
                            <v-card-title class="font-weight-light text-h4 justify-center mb-4">Mobile App</v-card-title>
                            <v-card-subtitle class="text-subtitle-2">
                                Shopping on Amazon Mobile is covered with our Mobile App
                            </v-card-subtitle>
                            <v-card-text class="text-body-1">
                                <p></p>
                                <p>The LOE Mobile App is installable when visiting your account portal from your mobile device. The mobile app makes it possible to use LOE when you're shopping from your mobile</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <!-- mobile has this duplicated in the same row -->
                </v-row>
                <v-row>
                    <!-- mobile has this duplicated in the same row -->
                    <v-col v-if="$vuetify.breakpoint.mobile" cols="12" class="d-flex justify-center align-start">
                        <v-card elevation="12" color="amber accent-1" shaped>
                            <v-card-title class="text-h5 justify-center mb-4">Mobile App</v-card-title>
                            <v-card-subtitle class="font-italic text-subtitle-2">
                                Shopping on Amazon Mobile is covered with our Mobile App
                            </v-card-subtitle>
                            <v-card-text class="text-body-1">
                                <p>The LOE Mobile App is installable when visiting your account portal from your mobile device.</p>
                                <p>Our Mobile App makes it possible to use LOE when you're shopping from Amazon's mobile app, by sharing from Amazon to LOE.</p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <!-- mobile has this duplicated in the same row -->
                </v-row>
            </v-container>
            <v-container fluid id="sheet3" class="pb-16">
            </v-container>
        </v-main>
        <loe-footer />
    </v-app>
</template>
<style scoped>
#sheet1 {
    background-color: #ffd54f;
}
.v-btn {
    text-transform: unset;
}
.mobile-br {
    width: 100%;
}
.nowrap {
    white-space: nowrap;
}
.link {
    text-decoration: none;
    color: black;
}
.login-icon {
    position: absolute;
    top: 0;
    right: 10px;
}
.menu-text {
    top: -14px;
    min-height: unset !important;
}
</style>
<script>
import StylizedName from "../components/StylizedName";
import LoeFooter from "../components/Footer";

export default {
    name: "Home",

    components: {
        StylizedName,
        LoeFooter,
    },

    data: () => ({
        //
    }),
    methods: {
        login() {
            this.$auth.loginWithRedirect({
                appState: { targetUrl: "/account" },
            });
        },
        logout() {
            this.$auth.logout({
                returnTo: "https://loe.june07.com",
            });
        },
    },
    mounted() {},
    computed: {
        isEdge: function () {
            return !!window.chrome && navigator.userAgent.indexOf("Edg") != -1;
        },
        isChrome: function () {
            return (
                !!window.chrome &&
                (!!window.chrome.webstore || !!window.chrome.runtime)
            );
        },
        extensionLink: function () {
            return this.isEdge
                ? "https://microsoftedge.microsoft.com/addons/detail/ggpmndmjelbgjcjanbpdaiigfeacgbji"
                : "https://chrome.google.com/webstore/detail/loe/nielhlpokoneeolkilpbkafnaimmmmdc";
        },
    },
};
</script>
