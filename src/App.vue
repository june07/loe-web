<template>
    <v-app>
        <v-app-bar
                   app
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
        </v-app-bar>

        <v-main>
            <v-container fluid id="sheet1" class="pb-16">
                <v-row>
                    <v-spacer></v-spacer>
                    <v-col v-if="$vuetify.breakpoint.mobile" cols="12">
                        <v-img src="https://res.cloudinary.com/june07/image/upload/v1629145980/shopping-cart-shopping-purchasing-candy-alpha_olfd3o.png">
                        </v-img>
                    </v-col>
                    <v-col class="d-flex flex-column justify-center" :cols="$vuetify.breakpoint.mobile ? 12 : 5">
                        <template>
                            <v-card
                                    color="amber lighten-2"
                                    class="ml-8"
                                    outlined>

                                <v-card-title  v-bind:class="$vuetify.breakpoint.mobile ? 'text-h5' : 'text-h1'" class="mb-1">
                                    <span v-bind:class="$vuetify.breakpoint.mobile ? 'font-weight-light' : ''" class="mobile-br">Amazon shopping,</span>
                                    <span class="font-weight-bold">Intelligently</span>
                                </v-card-title>
                                <v-card-text v-bind:class="$vuetify.breakpoint.mobile ? 'subtitle-2': 'subtitle-1'" class="my-8">Stop searching through your amazon order history, guessing, or just plain giving up on being informed on what you paid for something previously.
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
                        </template>
                    </v-col>
                    <v-col v-if="!$vuetify.breakpoint.mobile" cols="5">
                        <v-img src="https://res.cloudinary.com/june07/image/upload/v1629145980/shopping-cart-shopping-purchasing-candy-alpha_olfd3o.png">
                        </v-img>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <loe-footer></loe-footer>
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
    width: 100%
}
</style>
<script>
import StylizedName from "./components/StylizedName";
import LoeFooter from "./components/Footer";

export default {
    name: "App",

    components: {
        LoeFooter,
        StylizedName
    },

    data: () => ({
        //
    }),
    mounted() {},
    computed: {
        isEdge: function () {
            return this.isChrome && navigator.userAgent.indexOf("Edg") != -1;
        },
        isChrome: function () {
            return (
                !!window.chrome &&
                (!!window.chrome.webstore || !!window.chrome.runtime)
            );
        },
        extensionLink: function() {
            return this.isEdge ? 'https://chrome.google.com/webstore/detail/loe/nielhlpokoneeolkilpbkafnaimmmmdc' : 'https://chrome.google.com/webstore/detail/loe/nielhlpokoneeolkilpbkafnaimmmmdc'
        }
    },
};
</script>
