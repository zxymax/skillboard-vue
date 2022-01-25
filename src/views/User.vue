<template>
    <Layout>
        <b-container v-if="loading">
            <b-row>
                <b-col>
                    <div class="text-center mt-4">
                        <h3>Loading that skillboard, please hang tight....</h3>
                        <b-spinner
                            style="width: 3rem; height: 3rem"
                        ></b-spinner>
                    </div>
                </b-col>
            </b-row>
        </b-container>
        <b-container v-else class="mt-2">
            <b-row class="mb-2">
                <b-col>
                    <h3 class="header">
                        Viewing Skillboard for {{ character.name }}
                    </h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="3">
                    <div class="text-center">
                        <b-img
                            :src="`https://images.evetech.net/characters/${characterID}/portrait?size=256`"
                            rounded
                        />
                    </div>
                </b-col>
                <b-col lg="9">
                    <b-row>
                        <b-col lg="6">
                            <table class="table">
                                <thead class="table-light">
                                    <tr>
                                        <th colspan="2" class="text-center">
                                            Basic Info
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Corporation</td>
                                        <td class="text-end">
                                            {{ character.corporation.name }}
                                        </td>
                                    </tr>

                                    <tr v-if="character.alliance">
                                        <td>Alliance</td>
                                        <td class="text-end">
                                            {{ character.alliance.name }}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Date Of Birth</td>
                                        <td class="text-end">
                                            {{ birthday }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Security Status</td>
                                        <td class="text-end">
                                            {{ character.security_status }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-col>
                        <b-col lg="6">
                            <table class="table">
                                <thead class="table-light">
                                    <tr>
                                        <th colspan="2" class="text-center">
                                            Basic Skill Info
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Unallocated Skillpoints</td>
                                        <td class="text-end">
                                            {{
                                                skillMeta.unallocated_sp
                                                    | formatNum
                                            }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Allocated Skillpoints</td>
                                        <td class="text-end">
                                            {{ skillMeta.total_sp | formatNum }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Total Skillpoints</td>
                                        <td class="text-end">
                                            {{
                                                (skillMeta.total_sp +
                                                    skillMeta.unallocated_sp)
                                                    | formatNum
                                            }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col lg="6">
                            <table class="table">
                                <thead class="table-light">
                                    <tr>
                                        <th colspan="2" class="text-center">
                                            Attributes Overview
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Available Remaps</td>
                                        <td class="text-end">
                                            {{ attributes.bonus_remaps }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Charisma</td>
                                        <td class="text-end">
                                            {{ attributes.charisma }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Intelligence</td>
                                        <td class="text-end">
                                            {{ attributes.intelligence }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Memory</td>
                                        <td class="text-end">
                                            {{ attributes.memory }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Perception</td>
                                        <td class="text-end">
                                            {{ attributes.perception }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Willpower</td>
                                        <td class="text-end">
                                            {{ attributes.willpower }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-col>
                        <b-col lg="6">
                            <table class="table">
                                <thead class="table-light">
                                    <tr>
                                        <th colspan="2" class="text-center">
                                            Skill Queue Overview
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Number of Skills Queued</td>
                                        <td class="text-end">
                                            {{ queue.length }}
                                        </td>
                                    </tr>
                                    <tr v-if="firstQueuePosition">
                                        <td>Currently Training</td>
                                        <td class="text-end">
                                            {{ firstQueuePosition.type.name }}
                                            {{
                                                firstQueuePosition.finished_level
                                            }}
                                        </td>
                                    </tr>
                                    <tr v-if="firstQueuePosition">
                                        <td>Anticipated Finish</td>
                                        <td class="text-end">
                                            {{ firstQueuePosition.finish_date }}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" class="text-center">
                                            <small class="text-muted">
                                                If the above is in the past,
                                                then the character has not
                                                logged in recently
                                            </small>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class="my-2">
                <b-tabs pills card align="center" nav-wrapper-class="header">
                    <b-tab title="Skill List" active>
                        <SkillList :skills="skills" />
                    </b-tab>
                    <b-tab title="Flyable">
                        <Flyable :flyable="flyable" />
                    </b-tab>
                    <b-tab title="Clones">
                        <Clones :clones="clones" />
                    </b-tab>
                    <b-tab title="Implants">
                        <ImplantList :implants="implants" />
                    </b-tab>
                    <b-tab title="Standings">
                        <Standings :contacts="contacts" />
                    </b-tab>
                    <div v-if="user && id == user.id">
                        <b-tab title="Settings">
                            <Settings
                                :id="id"
                                :settings="settings"
                                @reload="loadUser"
                            />
                        </b-tab>
                    </div>
                </b-tabs>
            </b-row>
        </b-container>
    </Layout>
</template>

<script>
import SkillList from '@/components/SkillList';
import Settings from '@/components/Settings';
import ImplantList from '@/components/ImplantList';
import Flyable from '@/components/Flyable';
import Clones from '@/components/Clones';
import Standings from '@/components/Standings';
import Layout from '@/views/layout/Main';
import { skillboardAPI } from '@/config';

import moment from 'moment';
import { mapGetters } from 'vuex';
import numeral from 'numeral';

export default {
    name: 'Character',
    components: {
        Layout,
        SkillList,
        Flyable,
        ImplantList,
        Clones,
        Standings,
        Settings,
    },
    data: () => {
        return {
            loading: true,
            id: '',
            user: null,
            character: null,
            attributes: null,
            clones: null,
            skillMeta: null,
            queue: [],
            skills: [],
            implants: [],
            flyable: [],
            contacts: [],
        };
    },

    computed: {
        firstQueuePosition() {
            const position = this.queue.find((i) => i.queue_position === 1);
            if (!position) {
                return false;
            }

            return position;
        },
        birthday() {
            return moment(this.character.birthday).format('YYYY-MM-DD');
        },
    },
    filters: {
        formatNum(num) {
            return numeral(num).format('0,0');
        },
    },
    methods: {
        ...mapGetters(['getUser']),
        async loadUser() {
            this.loading = true;
            const { id } = this.$router.history.current.params;
            if (!id) {
                this.$router.push({ name: 'home' });
                return;
            }
            this.id = id;

            this.user = this.getUser();

            await this.axios
                .get(`${skillboardAPI}/user/${id}`)
                .then((response) => {
                    this.characterID = response.data.character_id;
                });

            await Promise.all([
                this.fetchCharacter(),
                this.fetchSettings(),
                this.fetchClones(),
                this.fetchSkills(),
                this.fetchQueue(),
                this.fetchSkillMeta(),
                this.fetchAttributes(),
                this.fetchImplants(),
                this.fetchFlyable(),
                this.fetchStandings(),
            ])
                .then(() => {
                    this.loading = false;
                })
                .catch((err) => {
                    this.loading = false;
                });
        },
        fetchUser() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}`)
                .then((response) => {
                    this.user = response.data;
                });
        },
        fetchCharacter() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/character`)
                .then((response) => {
                    this.character = response.data;
                });
        },
        fetchClones() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/clones`)
                .then((response) => {
                    this.clones = response.data;
                })
                .catch(() => {
                    this.clones = {};
                });
        },
        fetchAttributes() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/attributes`)
                .then((response) => {
                    this.attributes = response.data;
                })
                .catch(() => {
                    this.attributes = {};
                });
        },
        fetchSkillMeta() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/skills/meta`)
                .then((response) => {
                    this.skillMeta = response.data;
                })
                .catch(() => {
                    this.skillMeta = {};
                });
        },
        fetchSkills() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/skills`)
                .then((response) => {
                    this.skills = response.data;
                })
                .catch(() => {
                    this.skills = [];
                });
        },
        fetchSettings() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/settings`)
                .then((response) => {
                    this.settings = response.data;
                });
        },
        fetchQueue() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/queue`)
                .then((response) => {
                    this.queue = response.data;
                })
                .catch(() => {
                    this.queue = [];
                });
        },
        fetchImplants() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/implants`)
                .then((response) => {
                    this.implants = response.data;
                })
                .catch(() => {
                    this.implants = [];
                });
        },
        fetchFlyable() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/flyable`)
                .then((response) => {
                    this.flyable = response.data;
                })
                .catch(() => {
                    this.flyable = [];
                });
        },
        fetchStandings() {
            return this.axios
                .get(`${skillboardAPI}/user/${this.id}/contacts`)
                .then((response) => {
                    this.contacts = response.data;
                })
                .catch(() => {
                    this.contacts = [];
                });
        },
    },
    watch: {
        $route: function (to, from) {
            if (to.path != from.path) {
                this.loading = true;
                this.loadUser();
            }
        },
    },
    created() {
        this.loadUser();
    },
};
</script>

<style>
.header {
    border-bottom: 2px solid white;
}
.pointer {
    cursor: pointer;
    text-decoration: none;
}
</style>
