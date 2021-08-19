<template>
    <v-container id="account">
        <v-row>
            <v-col>
                <v-card-title>Invoices</v-card-title>
                <v-card-subtitle>Total Amazon Invoices</v-card-subtitle>
                <v-card-text>
                    <v-progress-circular
                                         :rotate="360"
                                         :size="100"
                                         :width="15"
                                         :value="value">
                        {{ value }}
                    </v-progress-circular>
                </v-card-text>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import io from "socket.io-client";

export default {
    name: "Account",
    components: {},
    data() {
        return {
            socket: null
        }
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
    },
    mounted() {
        let token
        const wait = () => {
            setTimeout(async () => {
                if (!this.$auth.loading) {
                    try {
                        token = await this.$auth.getTokenSilently();
                    } catch (error) {
                        console.log(error);
                    }
                    this.socket = io("https://ltoe.june07.com/web", {
                        auth: { token },
                    });
                    this.init()
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
        },
        percentage(value, max) {
            return Math.floor((value / max) * 100);
        },
        sync() {
            this.socket.emit("sync",
                {},
                async receipts => {
                    receipts
                })
        }
    },
};
</script>
