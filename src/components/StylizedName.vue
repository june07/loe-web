<template>
    <div class="row" v-bind:class="fontClass">
        <div class="col d-flex flex-column justify-center px-0"><span class="font-weight-light text-h4 black--text">LOE</span></div>
        <div class="col d-flex flex-column justify-center px-0"><span class="font-weight-thin text-italic black--text mx-2">by</span></div>
        <div class="col d-flex flex-column justify-center px-0"><span class="font-weight-medium text-h6 black--text">June07</span></div>
    </div>
</template>
<script>
export default {
    name: 'stylizedName',
    props: {
        size: String
    },
    computed: {
        fontClass: function() {
            return `${this.size}`;
        }
    }
}
</script>