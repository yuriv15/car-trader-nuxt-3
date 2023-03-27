<script setup lang="ts">
const route = useRoute();
const { cars } = useCars();
const { toTitleCase } = useUtilities();
const { name, id } = route.params as { name: string; id: string };

useHead({
    title: toTitleCase(name),
});

const car = computed(() => {
    return cars.find((c) => {
        return c.id === parseInt(id);
    });
});

if (!car.value) {
    throw createError({
        statusCode: 404,
        message: `Car with ID of ${route.params.id} does not exist`,
    });
}

definePageMeta({
    layout: 'custom',
});
</script>

<template>
    <div>
        <CarDetailHero :car="car" />
        <CarDetailAttributes :features="car.features" />
        <CarDetailDescription :description="car.description" />
        <CarDetailContact />
    </div>
</template>
