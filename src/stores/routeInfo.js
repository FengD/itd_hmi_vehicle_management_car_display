import { request } from '@/utils/request';
import { routeInfo } from '@/config/dataSource';

export default {
    routeinfo: {
        info: {},
    },

    async fetchJsonData() {
        try {
            const { data } = await request(routeInfo);
            const { info } = data.data;
            this.routeinfo = { info };
        } catch (err) {
            console.log("fetchJsonDataErr", err);
        }
    },
};