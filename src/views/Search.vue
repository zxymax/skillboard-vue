<template>
    <Layout>
        <b-container>
            <b-row>
                <b-col>
                    <h3 class="header text-center">Search For A Character</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="6" offset-lg="3" md="12">
                    <b-row>
                        <b-col cols="11">
                            <b-form-input v-model="searchQuery" />
                        </b-col>
                        <b-col cols="1">
                            <b-button @click="search"> Search </b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>

            <div class="mt-5">
                <b-row>
                    <b-col>
                        <h3 class="header text-center">Search Results</h3>
                    </b-col>
                </b-row>
                <div v-if="loading">
                    <b-spinner
                        class="text-center"
                        style="width: 3rem; height: 3rem"
                    ></b-spinner>
                </div>
                <b-row v-if="!loading">
                    <b-col lg="6" offset-lg="3" md="12">
                        <b-list-group>
                            <b-list-group-item
                                v-for="user in users"
                                :key="user.id"
                                :to="{
                                    name: 'user',
                                    params: { id: user.id },
                                }"
                            >
                                <b-img
                                    :src="`https://images.evetech.net/characters/${user.character_id}/portrait?size=32`"
                                    class="mr-2"
                                />
                                <span class="ml-2">
                                    {{ user.info.name }}
                                </span>
                            </b-list-group-item>
                            <b-list-group-item v-if="!users.length">
                                No Characters Returned
                            </b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
            </div>
        </b-container>
    </Layout>
</template>

<script>
import Layout from '@/views/layout/Main';
import { skillboardAPI } from '@/config';

export default {
    name: 'Search',
    components: {
        Layout,
    },
    data: () => {
        return {
            loading: true,
            searchQuery: null,
            users: [],
        };
    },
    methods: {
        async search() {
            this.loading = true;
            try {
                const response = await this.axios.get(
                    `${skillboardAPI}/search?q=${this.searchQuery}`
                );
                this.users = response.data;
            } catch (e) {
                console.log(e.error);
            }

            this.loading = false;
        },
    },
    created() {
        const q = this.$route.query.q;
        if (q) {
            this.searchQuery = decodeURIComponent(q);
            this.search();
        }
    },
};
</script>

<style></style>
