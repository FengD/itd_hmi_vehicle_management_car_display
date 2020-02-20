import { request } from '@/utils/request';
import { serverIp } from '../config/settings';

const routeName = {
    baseURL: `http://${serverIp}`,
    url: '/route/car/%s from f',
    method: 'GET',
    headers: { token: "%s from f" },
};

export default {
    routeNameId: [],
    async fetchRouteData(token, carId) {
        routeName.headers = { token };
        routeName.url = `/routeDisplay/car/${carId}`;
        try {
            const { data } = await request(routeName);
            this.routeNameId = data.data;
        } catch (err) {
            console.log("fetchRouteDataErr", err);
        }
    },
};