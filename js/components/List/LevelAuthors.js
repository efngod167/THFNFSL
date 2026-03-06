export default {
    props: {
        author: {
            type: String,
            required: true,
        },
        creators: {
            type: Array,
            required: true,
        },
    },
    template: `
        <div class="level-authors">
            <template v-if="selfVerified">
                <div class="type-title-sm">Composer & Charter</div>
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
            <template v-else>
                <div class="type-title-sm">Composers</div>
                <p class="type-body">
                    <template v-for="(creators, index) in creators" :key="\`creators-\$\{creators\}\`">
                        <span >{{ creators }}</span
                        ><span v-if="index < creators.length - 1">, </span>
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
