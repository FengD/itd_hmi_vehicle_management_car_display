import { request } from '@/utils/request';
import { carData } from '@/config/dataSource';

export default {
    carinfo: {
        carid: '',
        name: '',
        department: '',
        longitude: '',
        latitude: '',
        speed: '',
    },

    async fetchData() {
        const { data } = await request(carData);
        const { carid, name, department, longitude, latitude, speed } = data.data;
        this.carinfo = { carid, name, department, longitude, latitude, speed };
    },
};