import { request } from '@/utils/request';
// import { routeName } from '@/config/dataSource';
import { serverIp } from '../config/settings';


export const routeName = {
    baseURL: 'http://' + serverIp,
    url: '/route/car/' + 1,
    method: 'GET',
    headers: { token: localStorage.getItem('token') },
};

export default {
    routeNameId: [],
    async fetchRouteData(carId, token) {
        try {
            routeName.url = '/route/car/' + carId;
            routeName.headers = { token };
            const { data } = await request(routeName);
            this.routeNameId = data.data;
        } catch (err) {
            console.log("fetchRouteDataErr", err);
        }
    },
};