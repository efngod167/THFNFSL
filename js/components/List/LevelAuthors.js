export default {
    props: {
        author: {
            type: String,
            required: false,
        },
        creators: {
            type: Array,
            required: false,
        },
    },
    template: `
        <div class="level-authors">
            <template v-if="selfVerified">
                <div class="type-title-sm">Charter & Composer</div>
                <p class="type-body">
                    <span>{{ author }}</span>
                </p>
            </template>
            <template v-else-if="creators.length === 0">
                <div class="type-title-sm">Composer</div>
                <p class="type-body">
                    <span>{{ author }}</span>
                </p>
            </template>
                </p>
            </template>
            <div class="type-title-sm">Charter</div>
            <p class="type-body">
                <span>{{ author }}</span>
            </p>
        </div>
    `,

    computed: {
        selfVerified() {
            return this.author === this.verifier && this.creators.length === 0;
        },
    },
};
