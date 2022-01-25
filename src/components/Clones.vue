<template>
    <b-container>
        <b-row>
            <b-col
                v-for="clone in clones.jump_clones"
                lg="6"
                :key="clone.jump_clone_id"
                v-if="clones.jump_clones.length"
            >
                <b-list-group flush>
                    <b-list-group-item variant="secondary">
                        <div
                            v-if="
                                clone.location_type === 'station' &&
                                clone.station
                            "
                        >
                            {{ clone.station.name }}
                        </div>
                        <div
                            v-else-if="
                                clone.location_type === 'structure' &&
                                clone.structure
                            "
                        >
                            {{ clone.structure.name }}
                        </div>
                        <div v-else>
                            Unknown Location {{ clone.location_id }}
                        </div>
                    </b-list-group-item>
                    <b-list-group-item
                        v-for="implant in clone.implants"
                        v-if="clone.implants.length > 0"
                        :key="implant.id"
                    >
                        <div class="d-flex w-100">
                            <b-img
                                :src="`https://images.evetech.net/types/${implant.id}/icon?size=64`"
                                width="64px"
                                height="64px"
                            />
                            <div>
                                <strong>
                                    {{ implant.name }} ({{ implant.id }})
                                </strong>
                                <p class="mt-2">
                                    <b-button
                                        :href="`https://www.evedata.org/item?id=${implant.id}`"
                                        target="_blank"
                                    >
                                        View On Eve Data
                                    </b-button>
                                </p>
                            </div>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
            <b-col lg="6" v-else>
                <b-list-group flush>
                    <b-list-group-item variant="secondary">
                        <div>This Character Does not have any Jump Clones</div>
                    </b-list-group-item>
                </b-list-group>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    name: 'Clones',
    props: {
        clones: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.cantfly {
    opacity: 0.4;
}
</style>
