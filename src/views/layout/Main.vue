<template>
    <div>
        <div class="minHeight">
            <b-navbar type="dark" variant="dark">
                <b-container>
                    <b-navbar-nav>
                        <b-navbar-brand :to="{ name: 'home' }">
                            Skillboard.Evie
                        </b-navbar-brand>
                        <b-form-input
                            placeholder="Search"
                            v-model="searchQuery"
                        />
                        <b-button @click="searchCharacter" class="ms-2">
                            Search
                        </b-button>
                        <b-nav-item class="ms-2" :to="{ name: 'about' }">
                            About
                        </b-nav-item>
                    </b-navbar-nav>

                    <b-navbar-nav v-if="!isAuthed()">
                        <b-nav-item :to="{ name: 'login' }"> Login </b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav v-else>
                        <b-nav-item
                            :to="{
                                name: 'user',
                                params: { id: userID },
                            }"
                        >
                            My Character
                        </b-nav-item>
                        <b-nav-item :to="{ name: 'logout' }">Logout</b-nav-item>
                    </b-navbar-nav>
                </b-container>
            </b-navbar>
            <slot></slot>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from './Footer.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'Layout',
    data: () => {
        return {
            searchQuery: null,
        };
    },
    components: {
        Footer,
    },
    computed: {
        userID() {
            return this.isAuthed() ? this.getUser().id : '';
        },
    },
    methods: {
        ...mapGetters(['getUser', 'isAuthed']),
        searchCharacter() {
            this.$router.push({
                name: 'search',
                query: { q: encodeURIComponent(this.searchQuery) },
            });
        },
    },
};
</script>

<style>
.minHeight {
    min-height: 500px;
}
</style>
