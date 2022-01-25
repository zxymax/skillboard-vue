<template>
    <Layout>
        <b-container>
            <b-row>
                <b-col>
                    <h1 class="text-center header">About Skillboard.Evie</h1>
                </b-col>
            </b-row>
            <b-row>
                <b-col lg="3">
                    <div class="text-center">
                        <b-img
                            :src="`https://images.evetech.net/characters/95923084/portrait?size=256`"
                            rounded
                        />
                    </div>
                </b-col>
                <b-col lg="9">
                    Hi!!!! Skillboard.Evie was written and is maintain by David
                    Davaham. This is a project I put together after hearing that
                    a good Eve Buddy of mine (u/skiedude on Reddit and Brock
                    Khans in game) wants to win Eve once and for all. This site
                    is me returning to Eve Online to atleast continue developing
                    Eve Online. All of the source code can be found on Github,
                    links in the footer and I am available for any questions on
                    Tweetfleet Slack, link also in the footer.
                </b-col>
            </b-row>
        </b-container>
    </Layout>
</template>

<script>
import Layout from '@/views/layout/Main';

export default {
    name: 'About',
    components: {
        Layout,
    },
};
</script>

<style></style>
