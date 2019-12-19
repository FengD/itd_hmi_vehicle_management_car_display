import { request } from '@/utils/request';
import { routeInfo } from '@/config/dataSource';

export default {
    routeinfo: {
        info: {},
    },

    async fetchJsonData() {
        const { data } = await request(routeName);
        const { info } = data.data;
        this.routeinfo = { info };
    },
};