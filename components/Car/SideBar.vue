<script setup lang="ts">
const { makes } = useCars();
const modal = ref({
    make: false,
    location: false,
    price: false,
});

const city = ref('');
const priceRange = ref({
    min: '',
    max: '',
});
const route = useRoute();
const router = useRouter();

const priceRangeText = computed(() => {
    const minPrice = route.query.minPrice;
    const maxPrice = route.query.maxPrice;

    if (!minPrice && !maxPrice) return 'Any';
    else if (!minPrice && maxPrice) return `< $${maxPrice}`;
    else if (minPrice && !maxPrice) return `> $${minPrice}`;
    else return `$${minPrice}-$${maxPrice}`;
});

function updateModal(key: keyof typeof modal.value) {
    modal.value[key] = !modal.value[key];
}

function onChangeLocation() {
    if (!city.value) return;
    if (!isNaN(parseInt(city.value)))
        throw createError({
            statusCode: 400,
            message: 'Invalid city format',
        });
    updateModal('location');
    navigateTo(`/city/${city.value}/car/${route.params.make}`);
    city.value = '';
}

function onChangeMake(make: string) {
    updateModal('make');
    navigateTo(`/city/${route.params.city}/car/${make}`);
}

function onChangePrice() {
    updateModal('price');
    const { min, max } = priceRange.value;
    if (max && min) {
        if (min > max) return;
    }
    router.push({
        query: {
            minPrice: min,
            maxPrice: max,
        },
    });
}
</script>

<template>
    <div class="shadow border w-64 mr-10 z-30 h-[190px]">
        <!--        LOCATION START-->
        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Location</h3>
            <h3
                @click="updateModal('location')"
                class="text-blue-400 capitalize"
            >
                {{ route.params.city }}
            </h3>
            <div
                v-if="modal.location"
                class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
            >
                <input
                    @keyup.enter="onChangeLocation"
                    v-model="city"
                    type="text"
                    class="border p-1 rounded"
                />
                <button
                    @click="onChangeLocation"
                    class="bg-blue-400 w-full mt-2 rounded text-white p-1"
                >
                    Apply
                </button>
            </div>
        </div>
        <!--        LOCATION END-->

        <!--        MAKE START-->
        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Make</h3>
            <h3 class="text-blue-400 capitalize" @click="updateModal('make')">
                {{ route.params.make || 'Any' }}
            </h3>
            <div
                class="absolute border shadow left-56 p-5 top-1 -m-1 w-[600px] flex justify-between flex-wrap bg-white"
                v-if="modal.make"
            >
                <h4
                    v-for="make in makes"
                    :key="make"
                    class="w-1/3"
                    @click="onChangeMake(make)"
                >
                    {{ make }}
                </h4>
            </div>
        </div>
        <!--    MAKE END-->
        <!--PRICE START-->
        <div class="p-5 flex justify-between relative cursor-pointer border-b">
            <h3>Price</h3>
            <h3 class="text-blue-400 capitalize" @click="updateModal('price')">
                {{ priceRangeText }}
            </h3>
            <div
                class="absolute border shadow left-56 p-5 top-1 -m-1 bg-white"
                v-if="modal.price"
            >
                <input
                    class="border p-1 rounded"
                    type="number"
                    placeholder="Min"
                    v-model="priceRange.min"
                />
                <input
                    class="border p-1 rounded mt-2"
                    type="number"
                    placeholder="Max"
                    v-model="priceRange.max"
                />
                <button
                    class="bg-blue-400 w-full mt-2 rounded text-white p-1"
                    @click="onChangePrice"
                >
                    Apply
                </button>
            </div>
        </div>
        <!--    PRICE END-->
    </div>
</template>
