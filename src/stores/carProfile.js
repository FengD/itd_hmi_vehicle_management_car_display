import { request } from '@/utils/request';
import { serverIp } from '../config/settings';

const carProfile = {
    baseURL: `http://${serverIp}`,
    url: '/car/%s from f/profile',
    method: 'GET',
    headers: { token: "%s from f" },
};

export default {
    carInfo: [],
    async fetchData(token, carId) {
        carProfile.headers = { token };
        carProfile.url = `/car/${carId}/profile`;
        try {
            const { data } = await request(carProfile);
            this.carInfo = data.data;
            console.log("data.data", data.data);
        } catch (err) {
            console.log("fetchDataErr", err);
        }
    },
};
