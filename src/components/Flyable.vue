<template>
    <b-row>
        <b-col lg="4">
            <b-list-group>
                <b-list-group-item variant="secondary">
                    Filter By Flyable
                </b-list-group-item>
                <b-list-group-item @click="filterFlyable = false" button>
                    Show All (Default)
                </b-list-group-item>
                <b-list-group-item @click="filterFlyable = true" button>
                    Show Only Flyable Ships
                </b-list-group-item>
            </b-list-group>
            <hr />
            <b-list-group>
                <b-list-group-item variant="secondary">
                    Filter Flyable By Ship Group
                </b-list-group-item>
                <b-list-group-item @click="filterGroup = null" button>
                    Show All
                </b-list-group-item>
                <b-list-group-item
                    v-for="group in groups"
                    :key="group.id"
                    @click="filterGroup = group.id"
                    button
                >
                    {{ group.name }} ({{ group.flyable.length }})
                </b-list-group-item>
            </b-list-group>
        </b-col>
        <b-col lg="8">
            <b-card
                v-for="group in groups"
                :key="group.id"
                class="mb-3"
                :hidden="
                    (filterGroup && filterGroup !== group.id) ||
                    (filterFlyable && group.flyable.length == 0)
                "
            >
                <template #header>
                    <h5 class="mb-0">
                        {{ group.name }} ({{ group.flyable.length }}/{{
                            group.ships.length
                        }})
                    </h5>
                </template>
                <b-card-body>
                    <b-row>
                        <b-col
                            sm="1"
                            v-for="ship in group.ships"
                            :key="ship.info.id"
                            :style="
                                !filterFlyable ||
                                (filterFlyable && ship.flyable)
                                    ? ''
                                    : 'display:none'
                            "
                        >
                            <b-img
                                :src="`https://images.evetech.net/types/${ship.info.id}/icon?size=64`"
                                :class="
                                    ship.flyable ? classCanFly : classCantfly
                                "
                                rounded
                                :id="`tooltip-info-pane-${ship.info.id}`"
                            />
                            <b-tooltip
                                :target="`tooltip-info-pane-${ship.info.id}`"
                                triggers="hover"
                            >
                                {{ ship.info.name }}
                            </b-tooltip>
                        </b-col>
                    </b-row>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name: 'Flyable',
    props: {
        flyable: {
            type: Array,
            required: true,
        },
    },
    computed: {
        classCanFly() {
            return '';
        },
        classCantfly() {
            return 'cantfly';
        },
    },
    data: () => {
        return {
            groups: [],
            filterFlyable: false,
            filterGroup: null,
        };
    },
    created() {
        const groupSet = new Set();
        const groupArray = [];

        for (let i = 0; i < this.flyable.length; i++) {
            if (!groupSet.has(this.flyable[i].info.group.id)) {
                groupArray.push(this.flyable[i].info.group);
                groupSet.add(this.flyable[i].info.group.id);
            }
        }

        groupArray.sort((a, b) => (a.name < b.name ? -1 : 1));

        groupArray.forEach((group) => {
            const flyable = this.flyable.filter((ship) => {
                return ship.info.group.id === group.id;
            });
            group.ships = flyable;
            group.flyable = flyable.filter((ship) => ship.flyable);
        });

        this.groups = groupArray;
    },
};
</script>

<style scoped>
.cantfly {
    opacity: 0.4;
}
</style>
