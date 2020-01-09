import { request } from '@/utils/request';
import { carProfile } from '@/config/dataSource';

export default {
    carinfo: [],

    async fetchData() {
        try {
            const { data } = await request(carProfile);
            this.carinfo = data.data;
        } catch (err) {
            console.log("fetchDataErr", err);
        }
    },
};
