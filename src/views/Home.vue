<template>
    <Layout>
        <b-container>
            <b-row>
                <b-col>
                    <h3 class="text-center header">
                        New Characters By Skillpoints - Last 7 Days
                    </h3>
                </b-col>
            </b-row>
            <b-row v-if="highlighted.length">
                <b-col
                    v-for="character in highlighted"
                    :key="character.id"
                    lg="2"
                    class="text-center"
                >
                    <b-img
                        :src="`https://images.evetech.net/characters/${character.character_id}/portrait?size=256`"
                        rounded
                        fluid
                    /><br />
                    <h6 class="mt-2 text-center">
                        {{ character.meta.total_sp | formatNum }} SP
                    </h6>

                    <router-link
                        :to="{ name: 'user', params: { id: character.id } }"
                    >
                        {{ character.info.name }}
                    </router-link>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col lg="2" class="text-center">
                    <b-img
                        :src="`https://images.evetech.net/characters/1/portrait?size=256`"
                        rounded
                    /><br />
                    <h6 class="mt-2 text-center">0 SP</h6>

                    <span>Register Now To See Me Replaced with you</span>
                </b-col>
            </b-row>
            <!-- <b-row>
                <b-col>
                    <h3 class="text-center header">
                        Sponsored Characters - Last 7 Days
                    </h3>
                    <h6 class="text-center">Coming Soon!</h6>
                </b-col>
            </b-row> -->
            <b-row>
                <b-col lg="10" offset="1">
                    <h3 class="text-center header">
                        Recent Registrations - Last 50
                    </h3>
                    <b-list-group>
                        <b-list-group-item
                            v-for="character in characters"
                            :key="character.id"
                            :to="{ name: 'user', params: { id: character.id } }"
                        >
                            <b-row>
                                <b-col lg="4">
                                    <div
                                        class="d-flex flex-row align-items-center"
                                    >
                                        <div>
                                            <b-img
                                                :src="`https://images.evetech.net/characters/${character.character_id}/portrait?size=64`"
                                                rounded
                                                class="pull-left"
                                            />
                                        </div>
                                        <div class="ms-2">
                                            <h5>
                                                {{ character.info.name }}
                                            </h5>
                                        </div>
                                    </div>
                                </b-col>
                                <b-col lg="4" class="d-flex align-items-center">
                                    <span class="h5">
                                        <span class="text-muted me-3">
                                            Skill Points:
                                        </span>
                                        {{
                                            character.meta.total_sp | formatNum
                                        }}
                                    </span>
                                </b-col>
                                <b-col lg="4" class="d-flex align-items-center">
                                    <span class="h5">
                                        <span class="text-muted me-3">
                                            Queued Skills:
                                        </span>
                                        {{
                                            character.skillQueue.length
                                                | formatNum
                                        }}
                                    </span>
                                </b-col>
                            </b-row>
                        </b-list-group-item>
                    </b-list-group>
                </b-col>
                <!-- <b-col>
                    <h6>
                        Ad for Sponsored Characters, Maybe another Ad from
                        Google. Keep it minimal
                    </h6>
                </b-col> -->
            </b-row>
        </b-container>
    </Layout>
</template>

<script>
import numeral from 'numeral';

import Layout from '@/views/layout/Main';
import { skillboardAPI } from '@/config';

export default {
    name: 'Home',
    components: {
        Layout,
    },
    data: () => {
        return {
            loading: true,
            characters: [],
            highlighted: [],
        };
    },
    filters: {
        formatNum(num) {
            return numeral(num).format('0,0');
        },
    },
    methods: {
        async init() {
            await Promise.all([this.fetchNewCharacters()]).then(() => {
                this.highlighted.sort((a, b) =>
                    a.meta.total_sp < b.meta.total_sp ? 1 : -1
                );
                this.highlighted = this.highlighted.slice(0, 6);
                this.loading = false;
                console.log(this.highlighted.length);
            });
        },
        fetchNewCharacters() {
            return this.axios
                .get(`${skillboardAPI}/recent`)
                .then((response) => {
                    this.characters = response.data;
                    this.highlighted = JSON.parse(
                        JSON.stringify(response.data)
                    );
                });
        },
    },
    created() {
        this.init();
    },
};
</script>

<style></style>
