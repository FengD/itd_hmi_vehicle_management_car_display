import { request } from '@/utils/request';
import { carProfile } from '@/config/dataSource';

export default {
    carInfo: [],

    async fetchData() {
        try {
            const { data } = await request(carProfile);
            this.carInfo = data.data;
            console.log("data.data", data.data);
        } catch (err) {
            console.log("fetchDataErr", err);
        }
    },
};
