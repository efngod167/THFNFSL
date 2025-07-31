import { store } from "../main.js";
import { embed } from "../util.js";
import { score } from "../score.js";
import { fetchEditors, fetchList } from "../content.js";

import Spinner from "../components/Spinner.js";
import LevelAuthors from "../components/List/LevelAuthors.js";

const roleIconMap = {
    owner: "crown",
    admin: "user-gear",
    helper: "user-shield",
    dev: "code",
    trial: "user-lock",
};

export default {
    components: { Spinner, LevelAuthors },
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-list">
            <div class="list-container">
                <table class="list" v-if="list">
                    <tr v-for="([level, err], i) in list">
                        <td class="rank">
                            <p v-if="i + 1 <= 75" class="type-label-lg">#{{ i + 1 }}</p>
                            <p v-else class="type-label-lg">Legacy</p>
                        </td>
                        <td class="level" :class="{ 'active': selected == i, 'error': !level }">
                            <button @click="selected = i">
                                <span class="type-label-lg">{{ level?.name || \`Error (\${err}.json)\` }}</span>
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="level-container">
                <div class="level" v-if="level">
                    <h1>{{ level.name }}</h1>
                    <LevelAuthors :charter="level.charter" :composers="level.composers"></LevelAuthors>
                    <iframe class="video" id="videoframe" :src="video" frameborder="0"></iframe>
                    <ul class="stats">
                        <li>
                            <div class="type-title-sm">Points when completed</div>
                            <p>{{ score(selected + 1, 100, level.percentToQualify) }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Misses</div>
                            <p>{{ level.misses || '0' }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Mod</div>
                            <p>{{ level.mod || 'Not Stated' }}</p>
                        </li>
                        <li>
                            <div class="type-title-sm">Spam</div>
                            <p>{{ level.spam || 'No' }}</p>
                        </li>
                    </ul>
                    <h2>Records</h2>
                    <p v-if="selected + 1 <= 75"><strong>{{ level.percentToQualify }}%</strong> to qualify</p>
                    <p v-else-if="selected +1 <= 75"><strong>100%</strong> to qualify</p>
                    <p v-else>This level does not accept new records.</p>
                    <table class="records">
                        <tr v-for="record in level.records" class="record">
                            <td class="percent">
                                <p>{{ record.percent }}%</p>
                            </td>
                            <td class="user">
                                <a :href="record.link" target="_blank" class="type-label-lg">{{ record.user }}</a>
                            </td>
                            <td class="mobile">
                                <img v-if="record.mobile" :src="\`/assets/phone-landscape\${store.dark ? '-dark' : ''}.svg\`" alt="Mobile">
                            </td>
                            <td class="misses">
                                <p>{{ record.misses }}</p>
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-else class="level" style="height: 100%; justify-content: center; align-items: center;">
                    <p>(ノಠ益ಠ)ノ彡┻━┻</p>
                </div>
            </div>
            <div class="meta-container">
                <div class="meta">
                    <div class="errors" v-show="errors.length > 0">
                        <p class="error" v-for="error of errors">{{ error }}</p>
                    </div>
                    <div class="og">
                        <p class="type-label-md">Website layout made by <a href="https://tsl.pages.dev/" target="_blank">TheShittyList</a></p>
                    </div>
                    <template v-if="editors">
                        <h3>List Editors</h3>
                        <ol class="editors">
                            <li v-for="editor in editors">
                                <img :src="\`/assets/\${roleIconMap[editor.role]}\${store.dark ? '-dark' : ''}.svg\`" :alt="editor.role">
                                <a v-if="editor.link" class="type-label-lg link" target="_blank" :href="editor.link">{{ editor.name }}</a>
                                <p v-else>{{ editor.name }}</p>
                            </li>
                        </ol>
                    </template>
                    <h3>List Requirements</h3>
                    <p>
                        The song must be possible in some sort of way, unless if the song is impossible and must be done with bots (for ex. Scopoliosis from Manny Edition V3) it cannot be added nor allowed.
                    </p>
                    <p>
                        If the mod from a song isn't publicly available to download, contact list mods or the owner for a backup of the mod. However, if it's not archived, the song from the specific mod will be removed from the list.
                    </p>
                    <p>
                        Your completion/verification video must have audible key presses (this does not mean you can use botplay, that is not allowed). However, you can include handcam if the video doesn't contain audio.
                    </p>
                    <p>
                        You're not allowed to secretly nerf charts of specific songs nor buff them, as it is cheating. This goes to recharts, unless it's either official or the song is changed in any way.
                    </p>
                    <p>
                        Spamming in non spam songs is absolutely prohibited, as it is an effortless way of beating songs and requires no skill. You can spam on songs if the spam label says "Yes".
                    </p>
                    <p>
                        You can only play on the hardest difficulty that exists. This rule doesn't apply to Spyware from Friday Night Sandboxin'.
                    </p>
                    <p>
                        You are allowed to submit mobile records, however you cannot use tile dragging as it is considered cheating.
                    </p>
                    <p>
                        As of right now, you cannot submit records of songs that are in RoFNF games (Monday Morning Misery, Funky Friday etc.) as the health bar mechanic doesn't work as it does in the game.
                    </p>
                    <p>
                        Songs that are above 10K are not allowed. This goes to Talladega B-Side, Athanatos, Space breaker and many more.
                    </p>
                    <p>
                        Once a song falls onto the Legacy List, we accept records for it for 24 hours after it falls off, then afterwards we never accept records for said song.
                    </p>
                </div>
            </div>
        </main>
    `,
    data: () => ({
        list: [],
        editors: [],
        loading: true,
        selected: 0,
        errors: [],
        roleIconMap,
        store
    }),
    computed: {
        level() {
            return this.list[this.selected][0];
        },
        video() {
            if (!this.level.showcase) {
                return embed(this.level.verification);
            }

            return embed(
                this.toggledShowcase
                    ? this.level.showcase
                    : this.level.verification
            );
        },
    },
    async mounted() {
        // Hide loading spinner
        this.list = await fetchList();
        this.editors = await fetchEditors();

        // Error handling
        if (!this.list) {
            this.errors = [
                "Failed to load list. Retry in a few minutes or notify list staff.",
            ];
        } else {
            this.errors.push(
                ...this.list
                    .filter(([_, err]) => err)
                    .map(([_, err]) => {
                        return `Failed to load level. (${err}.json)`;
                    })
            );
            if (!this.editors) {
                this.errors.push("Failed to load list editors.");
            }
        }

        this.loading = false;
    },
    methods: {
        embed,
        score,
    },
};
