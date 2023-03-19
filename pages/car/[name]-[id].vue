<script setup lang="ts">
import { useFormatter } from '~/hooks/useFormatter';

const route = useRoute();
const { toTitleCase } = useFormatter();

useHead({
    title: toTitleCase(route.params.name as string),
});
</script>

<template>
    <div
        class="mx-auto mt-4 max-w-7xl space-y-4 px-4 xs:px-8 sm:px-10 lg:px-16 pb-16 w-3/5"
    >
        <CarDetailHero />

        <CarDetailAttributes />

        <CarDetailDescription />

        <CarDetailContact />
    </div>
</template>
