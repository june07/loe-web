<template>
    <v-container id="account">
        <v-row>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3">
                <v-card shaped>
                    <v-icon x-large class="mt-4 mr-4" color="amber darken-2" style="float: right">mdi-receipt</v-icon>
                    <v-card-title>Invoices</v-card-title>
                    <v-card-subtitle>Total Amazon Invoices</v-card-subtitle>
                    <v-card-text>
                        <v-progress-circular color="primary"
                                             :rotate="360"
                                             :size="100"
                                             :width="15"
                                             :value="percentage(stats.totalReceipts, accountLimits.receipts)">
                            {{ percentage(stats.totalReceipts, accountLimits.receipts) }}%
                        </v-progress-circular>
                        <div class="mt-2"><b>Space Usage:</b> {{stats.totalReceipts}} <sup>of {{accountLimits.receipts}}</sup></div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3">
                <v-card shaped>
                    <v-icon x-large class="mt-4 mr-4" color="amber darken-2" style="float: right">mdi-api</v-icon>
                    <v-card-title>API Calls</v-card-title>
                    <v-card-subtitle>Total API Calls</v-card-subtitle>
                    <v-card-text>
                        <v-progress-circular color="primary"
                                             :rotate="360"
                                             :size="100"
                                             :width="15"
                                             :value="percentage(stats.totalApiCalls, accountLimits.apiCalls)">
                            {{ percentage(stats.totalApiCalls, accountLimits.apiCalls) }}%
                        </v-progress-circular>
                        <div class="mt-2"><b>Bandwidth Usage:</b> {{stats.totalApiCalls}} <sup>of {{accountLimits.apiCalls}}</sup></div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        parsedUrl: [{{ parsedUrl }}]
    </v-container>
</template>
<style>
.v-application--wrap {
    min-height: unset !important;
}
</style>
<script>
import io from "socket.io-client";

export default {
    name: "Account",
    components: {},
    data() {
        return {
            socket: null,
            parsedUrl: null
        };
    },
    computed: {
        stats: function () {
            return this.$store.state.stats;
        },
        accountLimits: function () {
            return {
                receipts: 1000, // eventually get this based on the user's subscription level
                apiCalls: 500,
            };
        },
        deferredPrompt: function () {
            return this.$store.state.deferredPrompt;
        },
        showInstallPromotion: function () {
            return this.$store.state.showInstallPromotion;
        },
    },
    mounted() {
        let token;
        const wait = () => {
            setTimeout(async () => {
                if (!this.$auth.loading) {
                    try {
                        token = await this.$auth.getTokenSilently();
                    } catch (error) {
                        console.log(error);
                    }
                    this.socket = io("https://ltoe.june07.com/web", {
                        withCredentials: true,
                        auth: { token },
                    });
                    this.init();
                } else {
                    wait();
                }
            }, 500);
        };
        wait();
    },
    methods: {
        init() {
            const updateMaxAge = Date.now() - 1000;
            if (!this.stats.updated || this.stats.updated > updateMaxAge) {
                this.socket.emit("stats", {}, async (stats) => {
                    this.$store.commit({ type: "set", stats });
                });
            }
            this.pwaInstall();
            this.parsedUrl = new URL(window.location);
        },
        percentage(value, max) {
            return Math.floor((value / max) * 100);
        },
        sync() {
            this.socket.emit("sync", {}, async (receipts) => {
                receipts;
            });
        },
        pwaInstall() {
            window.addEventListener("beforeinstallprompt", (e) => {
                // Prevent the mini-infobar from appearing on mobile
                e.preventDefault();
                // Stash the event so it can be triggered later.
                this.deferredPrompt = e;
                // Update UI notify the user they can install the PWA
                this.$store.commit({ type: "set", showInstallPromotion: true });
                // Optionally, send analytics event that PWA install promo was shown.
                console.log(`'beforeinstallprompt' event was fired.`);
            });
            window.addEventListener("appinstalled", () => {
                // Hide the app-provided install promotion
                this.$store.commit({
                    type: "set",
                    showInstallPromotion: false,
                });
                // Clear the deferredPrompt so it can be garbage collected
                this.$store.commit({ type: "set", deferredPrompt: null });
                // Optionally, send analytics event to indicate successful install
                console.log("PWA was installed");
            });
        },
    },
};
</script>
