<template>
    <v-footer
              dark
              padless>
        <v-card
                flat
                tile
                width="100%"
                class="indigo lighten-1 white--text text-center">
            <v-card-text>
                <v-btn
                       v-for="link in links"
                       :key="link.icon"
                       :href="link.url"
                       class="mx-4 white--text"
                       icon>
                    <v-icon size="24px">
                        {{ link.icon }}
                    </v-icon>
                </v-btn>
            </v-card-text>

            <v-card-text class="white--text pt-0" style="margin: auto" v-bind:style="{ width: $vuetify.breakpoint.mobile ? '100%' : '50%', fontSize: $vuetify.breakpoint.mobile ? 'xx-small' : '' }">
                Like all browser extensions, LOE can read and change a limited amount of data in your browser. We only read the page for Amazon's sites so that we can deliver relevant data to you including prior prices paid for items. We take your privacy very seriously and you can read more about it in our <a style="color: white" href="https://june07.com/privacy">Privacy Policy</a>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-text class="white--text">
                <i aria-hidden="true" class="v-icon notranslate mdi mdi-copyright theme--light white--text" style="font-size: 16px;"></i>
                <span class="font-weight-thin body-2 mr-2">2021</span><strong>June07</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
export default {
    name: "loeFooter",
    data: () => ({
        links: [
            { icon: "mdi-google-chrome", url: "https://chrome.google.com/webstore/detail/loe/nielhlpokoneeolkilpbkafnaimmmmdc" },
            { icon: "mdi-microsoft-edge", url: "https://microsoftedge.microsoft.com/addons/detail/loe/ggpmndmjelbgjcjanbpdaiigfeacgbji" },
            { icon: "mdi-electron-framework", url: "https://owncloud.june07.com/s/u2QW738GBPVLXpC" }
        ],
    }),
};
</script>
