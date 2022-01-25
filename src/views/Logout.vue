<template></template>
<script>
import { mapActions } from 'vuex';

export default {
    name: 'Login',
    methods: {
        ...mapActions(['storeUser', 'storeToken']),
    },
    created() {
        this.storeUser(null);
        this.storeToken(null);
        this.$router.push({ name: 'home' });
    },
};
</script>
