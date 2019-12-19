import { request } from '@/utils/request';
import { routeName } from '@/config/dataSource';

export default {
    routename: {
        name: [],
    },

    async fetchRouteData() {
        const { data } = await request(routeName);
        const { name } = data.data;
        this.routename = { name };
    },
};