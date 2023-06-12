import cars from '@/data/cars.json';
import makes from '@/data/makes.json';

export function useCars() {
    return {
        cars,
        makes,
    };
}
