<template>
    <b-row>
        <b-col lg="4">
            <h5 class="header mt-2">Skill Filters</h5>
            <b-list-group>
                <b-list-group-item
                    variant="secondary"
                    class="d-flex justify-content-between"
                >
                    <strong>Skill Level</strong>
                </b-list-group-item>
                <b-list-group-item
                    class="pointer"
                    @click="filterSkillLevel = -1"
                >
                    List All Levels (Default)
                </b-list-group-item>
                <b-list-group-item
                    class="pointer"
                    @click="filterSkillLevel = 1"
                    button
                >
                    Level 1
                </b-list-group-item>
                <b-list-group-item
                    class="pointer"
                    @click="filterSkillLevel = 2"
                    button
                >
                    Level 2
                </b-list-group-item>
                <b-list-group-item
                    class="pointer"
                    @click="filterSkillLevel = 3"
                    button
                >
                    Level 3
                </b-list-group-item>
                <b-list-group-item
                    class="pointer"
                    @click="filterSkillLevel = 4"
                    button
                >
                    Level 4
                </b-list-group-item>
                <b-list-group-item
                    class="pointer"
                    @click="filterSkillLevel = 5"
                    button
                >
                    Level 5
                </b-list-group-item>
            </b-list-group>
            <hr />
            <b-list-group>
                <b-list-group-item
                    variant="secondary"
                    class="d-flex justify-content-between"
                >
                    <div>
                        <strong>Skill Groups (Count/Total SP)</strong>
                    </div>
                    <div>
                        <small>
                            <a class="pointer" @click="groupSortBy = 'sp'">
                                SP
                            </a>
                            |
                            <a class="pointer" @click="groupSortBy = 'count'">
                                Count
                            </a>
                            |
                            <a class="pointer" @click="groupSortBy = ''">
                                All
                            </a>
                        </small>
                    </div>
                </b-list-group-item>
                <b-list-group-item
                    class="pointer"
                    @click="filterGroupID = null"
                >
                    List All Skills
                </b-list-group-item>
                <b-list-group-item
                    v-for="group in skillGroups"
                    :key="group.info.id"
                    class="pointer"
                    @click="filterGroupID = group.info.id"
                    button
                >
                    {{ group.info.name }} ( {{ group.skills.length }} /
                    {{ group.totalGroupSP | formatNum }} SP )
                </b-list-group-item>
            </b-list-group>
        </b-col>
        <b-col lg="8">
            <b-card
                v-for="group in filteredSkills"
                :key="group.info.id"
                no-body
                class="mb-3"
                v-if="!group.hidden"
            >
                <template #header>
                    <h5 class="mb-0">
                        {{ group.info.name }} ( {{ group.skills.length }} /
                        {{ group.totalGroupSP | formatNum }} SP )
                    </h5>
                </template>
                <b-list-group flush>
                    <b-list-group-item>
                        {{ group.skills.length }} injected for a total of
                        {{ group.totalGroupSP | formatNum }} Skillpoints
                        <br />
                        {{ group.skills | levelVCount }} Level V Skills injected
                        for a total of
                        {{ group.skills | levelVSP | formatNum }}
                        Skillpoints
                    </b-list-group-item>
                    <b-list-group-item
                        v-for="skill in group.skills"
                        :key="skill.skillID"
                        v-if="!skill.hidden"
                    >
                        <div class="d-flex w-100 justify-content-between">
                            <div>
                                {{ skill.type.name }}<br />
                                <small class="text-muted">
                                    Rank: {{ skill.rank.value }} | Total SP:
                                    {{ skill.skillpoints_in_skill | formatNum }}
                                    of
                                    {{
                                        (skill.rank.value * 256000) | formatNum
                                    }}
                                </small>
                            </div>
                            <b-form-rating
                                inline
                                size="sm"
                                readonly
                                icon-empty="square"
                                icon-full="square-fill"
                                v-model="skill.active_skill_level"
                                style="
                                    color: white;
                                    background-color: transparent;
                                "
                            />
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import numeral from 'numeral';
export default {
    name: 'SkillList',
    props: {
        skills: {
            type: Array,
            required: true,
        },
    },
    data: () => {
        return {
            filterGroupID: 0,
            groupSortBy: '',
            filterSkillLevel: -1,
        };
    },
    computed: {
        skillGroups() {
            switch (this.groupSortBy) {
                case 'count':
                    return this.skills.sort((a, b) =>
                        a.skills.length < b.skills.length ? 1 : -1
                    );
                case 'sp':
                    return this.skills.sort((a, b) =>
                        a.totalGroupSP < b.totalGroupSP ? 1 : -1
                    );
                case '':
                    return this.skills.sort((a, b) =>
                        a.info.name > b.info.name ? 1 : -1
                    );
            }
        },
        filteredSkills() {
            this.skills.forEach((i) => {
                i.hidden =
                    this.filterGroupID > 0 && i.info.id !== this.filterGroupID;

                let hidden = 0;
                for (let ji = 0; ji < i.skills.length; ji++) {
                    const j = i.skills[ji];
                    const rank = j.type.dogma_attributes.find(
                        (k) => k.attribute_id === 275
                    );
                    if (!rank) {
                        return j;
                    }

                    j.rank = rank;

                    j.hidden =
                        this.filterSkillLevel > 0 &&
                        this.filterSkillLevel !== j.active_skill_level;

                    if (j.hidden) hidden++;
                }

                if (hidden === i.skills.length) i.hidden = true;
            });
            return this.skills;
        },
    },
    filters: {
        formatNum(num) {
            return numeral(num).format('0,0');
        },
        levelVCount(skills) {
            return skills.filter((i) => i.active_skill_level == 5).length;
        },
        levelVSP(skills) {
            return skills
                .filter((i) => i.active_skill_level == 5)
                .map((i) => i.skillpoints_in_skill)
                .reduce((a, b) => {
                    return a + b;
                }, 0);
        },
    },
};
</script>
