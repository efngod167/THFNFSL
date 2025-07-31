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
                <div class="type-title-sm">Composers</div>
                <p class="type-body">
                    <template v-for="(composer, index) in composers" :key="\`composer-\$\{composer\}\`">
                        <span >{{ author }}</span
                        ><span v-if="index < composers.length - 1">, </span>
                    </template>
                </p>
            </template>
            <div class="type-title-sm">Charter</div>
            <p class="type-body">
                <span>{{ author }}</span>
            </p>
			<template v-else>
                <div class="type-title-sm">Charters</div>
                <p class="type-body">
                    <template v-for="(charter, index) in charters" :key="\`charter-\$\{charter\}\`">
                        <span >{{ author }}</span
                        ><span v-if="index < charters.length - 1">, </span>
                    </template>
                </p>
        </div>
    `,

    computed: {
        selfVerified() {
            return this.author === this.verifier && this.creators.length === 0;
        },
    },
};
