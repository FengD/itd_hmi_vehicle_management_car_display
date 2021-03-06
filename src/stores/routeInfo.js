import { request } from '@/utils/request';
import { serverIp } from '../config/settings';

const routeInfo = {
    baseURL: `http://${serverIp}`,
    url: '/route/%s from f',
    method: 'GET',
    headers: { token: "%s from f" },
};

export default {
    routeJson: [],
    async fetchJsonData(token, routeId, cb) {
        try {
            routeInfo.headers = { token };
            routeInfo.url = `/routeDisplay/${routeId}`;
            const { data } = await request(routeInfo);
            // console.log("data", data);
            this.routeJson = data.data;
            cb(this.routeJson);
        } catch (err) {
            console.log("fetchJsonDataErr", err);
        }
    },
};