<script setup lang="ts">
import heartFilled from '@/assets/heartFilled.png';
import heartOutline from '@/assets/heartOutline.png';
import cars from '@/data/cars.json';

const props = defineProps<{
    car: (typeof cars)[0];
    favored: boolean;
}>();

const emit = defineEmits<{
    (e: 'favor', id: number): void;
}>();
</script>

<template>
    <div
        class="relative shadow border w-full overflow-hidden mb-5 cursor-pointer h-[200px]"
    >
        <img
            class="absolute w-7 right-5 top-2 z-20"
            :src="favored ? heartFilled : heartOutline"
            alt="Heart Outline"
            @click="emit('favor', car.id)"
        />
        <div
            class="flex h-full"
            @click="navigateTo(`/car/${car.name}-${car.id}`)"
        >
            <NuxtImg :src="car.url" :alt="car.name" class="w-[300px] h-full" />
            <div class="p-4 flex flex-col">
                <div>
                    <h1 class="text-2xl text-blue-700">
                        {{ car.name }}
                    </h1>
                    <p class="text-gray-700">
                        {{ car.description }}
                    </p>
                </div>
                <h1 class="mt-auto text-xl">{{ `$${car.price}` }}</h1>
            </div>
        </div>
    </div>
</template>
