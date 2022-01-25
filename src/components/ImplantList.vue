<template>
    <b-row>
        <b-col
            lg="6"
            md="12"
            v-for="implant in implants"
            :key="implant.info.id"
        >
            <b-card no-body>
                <b-list-group flush>
                    <b-list-group-item>
                        <div class="d-flex w-100">
                            <b-img
                                :src="`https://images.evetech.net/types/${implant.implant_id}/icon?size=128`"
                                width="96px"
                                height="96px"
                            />
                            <div>
                                <h5>
                                    {{ implant.info.name }} ({{
                                        implant.info.id
                                    }})
                                </h5>
                                <p>
                                    <b-button
                                        :href="`https://www.evedata.org/item?id=${implant.implant_id}`"
                                        target="_blank"
                                    >
                                        View On Eve Data</b-button
                                    >
                                </p>
                            </div>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'Implants',
    props: {
        implants: {
            type: Array,
            required: true,
        },
    },
};
</script>
