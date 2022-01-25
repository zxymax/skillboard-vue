<template>
    <b-container>
        <b-row>
            <b-col>
                <b-alert variant="primary" show
                    >The following is a list of standings this character has
                    towards other entities in the New Eden</b-alert
                >
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="4" v-if="hasCorporations">
                <b-list-group flush>
                    <b-list-group-item variant="secondary">
                        <strong>Corporation Standings</strong>
                    </b-list-group-item>
                    <b-list-group-item
                        v-for="contact in contacts"
                        :key="contact.contact_id"
                    >
                        <div class="d-flex w-100 justify-content-between">
                            <span
                                >[{{ contact.corporation.ticker }}]
                                {{ contact.corporation.name }}</span
                            >
                            <span>{{ contact.standing | formatNum }}</span>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col lg="4" v-if="hasAlliances">
                <b-list-group flush>
                    <b-list-group-item variant="secondary">
                        <strong>Alliance Standings</strong>
                    </b-list-group-item>
                    <b-list-group-item
                        v-for="contact in contacts"
                        :key="contact.contact_id"
                    >
                        <div class="d-flex w-100 justify-content-between">
                            <span
                                >[{{ contact.alliance.ticker }}]
                                {{ contact.alliance.name }}</span
                            >
                            <span>{{ contact.standing | formatNum }}</span>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <!-- <b-col lg="4" v-if="hasFact">
                <b-list-group flush>
                    <b-list-group-item
                        v-for="contact in contacts"
                        :key="contact.contact_id"
                    >
                        <div class="d-flex w-100 justify-content-between">
                            <span 
                                >[{{ contact.alliance.ticker }}]
                                {{ contact.alliance.name }}</span
                            >
                            <span>{{ contact.standing | formatNum }}</span>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-col> -->
        </b-row>
    </b-container>
</template>

<script>
import numeral from 'numeral';

export default {
    name: 'Standings',
    props: {
        contacts: {
            type: Array,
            required: true,
        },
    },
    filters: {
        formatNum(num) {
            return numeral(num).format('0,0.0');
        },
    },
    computed: {
        hasCorporations() {
            return this.contacts.filter((i) => i.contact_type === 'corporation')
                .length;
        },
        hasAlliances() {
            return this.contacts.filter((i) => i.contact_type === 'alliance')
                .length;
        },
        hasFactions() {
            return this.contacts.filter((i) => i.contact_type === 'faction')
                .length;
        },
    },
};
</script>

<style></style>
