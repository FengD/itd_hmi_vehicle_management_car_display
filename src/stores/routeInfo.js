import { request } from '@/utils/request';
// import { routeInfo } from '@/config/dataSource';
import { serverIp } from '../config/settings';

const routeInfo = {
    baseURL: 'http://' + serverIp,
    url: '/route/' + 1,
    method: 'GET',
    headers: { token: localStorage.getItem('token') },
};

export default {
    routeJson: [],
    async fetchJsonData(routeId, cb) {
        try {
            routeInfo.url = '/route/' + routeId;
            const { data } = await request(routeInfo);
            this.routeJson = data.data;
            cb(this.routeJson);
        } catch (err) {
            console.log("fetchJsonDataErr", err);
        }
    },
};