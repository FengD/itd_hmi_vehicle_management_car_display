import { request } from '@/utils/request';
import { routeInfo } from '@/config/dataSource';

export default {
    routeinfo: [],
    async fetchJsonData() {
        try {
            const { data } = await request(routeInfo);
            this.routeinfo = { data };
        } catch (err) {
            console.log("fetchJsonDataErr", err);
        }
    },
};