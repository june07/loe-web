<template>
    <v-container id="account">
        <v-row>
            <v-col :cols="$vuetify.breakpoint.mobile ? 12 : 3">
                <v-card shaped>
                    <v-icon x-large class="mt-4 mr-4" color="amber darken-2" style="float: right"></v-icon>
                    <v-card-title></v-card-title>
                    <v-card-subtitle>{{ asin }}</v-card-subtitle>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <span>{{ item.description }}</span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8" class="subtitle-1 font-weight-bold text-uppercase py-0">Lowest Paid</v-col>
                            <v-col cols="4" class="py-0">
                                <v-chip
                                        small
                                        color="green"
                                        text-color="white">
                                    <span class="subtitle-1 font-weight-light">{{ d3Format(item.lowestPaid) }}</span>
                                </v-chip>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="8" class="subtitle-1 font-weight-bold text-uppercase py-0">Highest Paid</v-col>
                            <v-col cols="4" class="py-0">
                                <v-chip
                                        small
                                        color="red"
                                        text-color="white">
                                    <span class="subtitle-1 font-weight-light">{{ d3Format(item.highestPaid) }}</span>
                                </v-chip>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="py-0">
                                Purchased <v-chip>{{ item.totalCount }}</v-chip> times.
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col class="py-0">
                                Most purchased at once <v-chip>{{ item.highestCount }}</v-chip>.
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
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
    </v-container>
</template>
<style>
.v-application--wrap {
    min-height: unset !important;
}
</style>
<script>
import io from "socket.io-client";
import { debounce } from "lodash";
import { format } from "d3-format";

const amazonProductRegexp = new RegExp(
    /https?:\/\/(smile|www)\.amazon\.com\/([\w-]+\/)?(?:dp\/|gp\/)(?:product\/)?(\w+\/)?(\w{10})/i
);

export default {
    name: "Account",
    components: {},
    data() {
        return {
            socket: null,
            parsedUrl: null,
        };
    },
    computed: {
        item: function () {
            return this.$store.state.item;
        },
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
        asin: function () {
            if (!this.parsedUrl) return null;
            let match = this.parsedUrl.searchParams
                .get("text")
                .match(/(.*)(https:\/\/.*$)/);
            if (!match) return null;
            //const description = match[1].trim()
            const url = match[2].trim();
            const asin = url.match(amazonProductRegexp)[4];
            return asin;
        },
    },
    watch: {
        asin: function (newAsin, oldAsin) {
            if (newAsin !== oldAsin) {
                this.getItem();
                this.debouncedGetItem();
            }
        },
    },
    created: function () {
        // _.debounce is a function provided by lodash to limit how
        // often a particularly expensive operation can be run.
        // In this case, we want to limit how often we access
        // yesno.wtf/api, waiting until the user has completely
        // finished typing before making the ajax request. To learn
        // more about the _.debounce function (and its cousin
        // _.throttle), visit: https://lodash.com/docs#debounce
        this.debouncedGetItem = debounce(this.getItem, 500);
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
        d3Format(value) {
            return format("$.2f")(value)
        },
        getItem() {
            this.socket.emit(
                "item",
                { asin: this.asin },
                async (itemPerReceipts) => {
                    const item = itemPerReceipts
                        .map((receipt) => receipt.items[0])
                        .reduce(
                            (acc, cur) => {
                                if (!acc.lowestPaid) acc.lowestPaid = cur.price;
                                else if (acc.lowestPaid > cur.price)
                                    acc.lowestPaid = cur.price;
                                if (acc.highestPaid < cur.price)
                                    acc.highestPaid = cur.price;
                                if (acc.highestCount < cur.count)
                                    acc.highestCount = cur.count;
                                acc.totalCount += cur.count;
                                acc.description = cur.description;
                                return acc;
                            },
                            {
                                lowestPaid: undefined,
                                highestPaid: 0,
                                highestCount: 1,
                                totalCount: 0,
                            }
                        );
                    this.$store.commit({ type: "set", item });
                }
            );
        },
    },
};
</script>
