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
            <template v-else-if="creators.length === 0">
                <div class="type-title-sm">Composer</div>
                <p class="type-body">
                    <span>{{ author }}</span>
                </p>
            <template v-else>
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
