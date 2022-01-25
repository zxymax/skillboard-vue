<template>
    <b-container>
        <b-row>
            <b-col lg="4" offset="4">
                <b-list-group flush>
                    <b-list-group-item variant="secondary">
                        <strong>User Settings</strong>
                    </b-list-group-item>
                    <b-list-group-item
                        :variant="hideClones ? 'primary' : ''"
                        @click="hideClones = !hideClones"
                        button
                    >
                        Hide Clones
                    </b-list-group-item>
                    <b-list-group-item
                        :variant="hideQueue ? 'primary' : ''"
                        @click="hideQueue = !hideQueue"
                        button
                    >
                        Hide Queue
                    </b-list-group-item>
                    <b-list-group-item
                        :variant="hideStandings ? 'primary' : ''"
                        @click="hideStandings = !hideStandings"
                        button
                    >
                        Hide Standings
                    </b-list-group-item>
                    <b-list-group-item
                        :variant="hideShips ? 'primary' : ''"
                        @click="hideShips = !hideShips"
                        button
                    >
                        Hide Ships
                    </b-list-group-item>
                    <b-list-group-item>
                        <b-button @click="updateSettings"
                            >Update Settings</b-button
                        >
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { skillboardAPI } from '@/config';

export default {
    name: 'Settings',
    data() {
        return {
            hideClones: false,
            hideQueue: false,
            hideStandings: false,
            hideShips: false,
        };
    },
    props: {
        id: {
            type: String,
        },
        settings: {
            type: Object,
        },
    },
    methods: {
        async updateSettings() {
            await this.axios
                .post(`${skillboardAPI}/user/${this.id}/settings`, {
                    hide_clones: this.hideClones,
                    hide_queue: this.hideQueue,
                    hide_standings: this.hideStandings,
                    hide_ships: this.hideShips,
                })
                .then((response) => {
                    console.log(response);
                    if (response.status !== 204) {
                        return;
                    }

                    this.$emit('reload');
                });
        },
    },
    created() {
        if (this.settings) {
            const { hide_clones, hide_queue, hide_standings, hide_ships } =
                this.settings;
            this.hideQueue = hide_queue;
            this.hideClones = hide_clones;
            this.hideStandings = hide_standings;
            this.hideShips = hide_ships;
        }
    },
};
</script>

<style></style>
