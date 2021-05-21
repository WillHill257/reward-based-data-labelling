<template>
    <span class="go-back">
        <v-btn @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
    </span>
</template>
<script>
import Vue from 'vue';
export default Vue.extend({
    
    methods:{
        goBack(){
            return this.$router.go(-1);
        },
    }
});
</script>
