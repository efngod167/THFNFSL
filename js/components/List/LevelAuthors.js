export default {
    props: {
        charters: {
            type: String,
            required: true,
        },
        composers: {
            type: Array,
            required: true,
        },
    },
    template: `
        <div class="level-authors">
            <template v-if="selfVerified">
                <div class="type-title-sm">Creator & Verifier</div>
                <p class="type-body">
                    <span>{{ author }}</span>
                </p>
            </template>
            <template v-else-if="creators.length === 0">
                <div class="type-title-sm">Composers</div>
                <p class="type-body">
                    <span>{{ author }}</span>
                </p>
            </template>
            <div class="type-title-sm">Charters</div>
            <p class="type-body">
                <span>{{ charter }}</span>
            </p>
        </div>
    `,

    computed: {
        selfVerified() {
            return this.author === this.verifier && this.creators.length === 0;
        },
    },
};
