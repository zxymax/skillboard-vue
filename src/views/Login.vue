<template>
    <Layout>
        <b-container class="mt-4">
            <b-row align-v="center">
                <b-col cols="6" offset="3">
                    <b-card>
                        <template #header>
                            <h5 class="mb-0 text-center">
                                Welcome to Evie Skillboard
                            </h5>
                        </template>
                        <b-card-text v-if="loading">
                            <h3>
                                Loading that skillboard, please hang tight....
                            </h3>
                            <b-spinner
                                style="width: 3rem; height: 3rem"
                            ></b-spinner>
                        </b-card-text>

                        <b-card-text v-else-if="!loading && registering">
                            Thank you for registering with Evie Skillboard. We
                            are proessing your character now, when this is
                            complete, you'll be redirected to your character
                            page. Please hang tight....
                        </b-card-text>
                        <b-card-text v-else>
                            Hang tight whilst we establish a session with CCP
                            SSO....you'll be redirected to CCP's SSO once the
                            session is ready
                        </b-card-text>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </Layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Layout from '@/views/layout/Main';
import { skillboardAPI } from '@/config';

export default {
    name: 'Login',
    components: {
        Layout,
    },
    data() {
        return {
            loading: false,
            user: null,
            registering: false,
            pollCounter: 0,
        };
    },
    methods: {
        ...mapActions(['storeToken', 'storeUser']),
        ...mapGetters(['getUser']),
        initializeAuth() {
            this.axios.get(`${skillboardAPI}/auth`).then((response) => {
                window.location.href = response.data.url;
            });
        },
        async finalizeAuth() {
            const { code, state } = this.$router.history.current.query;

            try {
                const response = await this.axios.get(
                    `${skillboardAPI}/auth?code=${code}&state=${state}`
                );
                const { data } = response;

                const { user, token } = data;

                this.storeUser(user);
                this.storeToken(token);

                if (!user.is_new) {
                    this.$router.push({
                        name: 'user',
                        params: { id: user.id },
                    });
                    return;
                }

                this.user = user;

                this.registering = true;
                this.loading = false;
                setTimeout(this.pollNew, 2000);
            } catch (e) {
                console.log('user login attempt failed', e);
                return;
            }
        },
        async pollNew() {
            this.pollCounter++;
            try {
                const { data } = await this.axios.get(
                    `${skillboardAPI}/user/${this.user.id}`
                );

                if (!data.is_new) {
                    this.$router.push({
                        name: 'user',
                        params: { id: this.user.id },
                    });
                    return;
                }

                setTimeout(this.pollNew, 2000);
            } catch (e) {
                console.log(
                    'failed to poll user endpoint for new registration',
                    e.error
                );
                return;
            }
        },
    },
    watch: {
        $route: function (to, from) {
            if (to.fullPath != from.fullPath) {
                setTimeout(() => {
                    this.initializeAuth();
                }, 2000);
            }
        },
    },
    created() {
        const { code, state } = this.$router.history.current.query;

        if (!!code && !!state) {
            this.finalizeAuth();
            return;
        }

        this.initializeAuth();
    },
};
</script>
