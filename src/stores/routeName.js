import { request } from '@/utils/request';
import { routeName } from '@/config/dataSource';

export default {
    routename: {
        name: [],
    },

    async fetchRouteData() {
        try {
            const { data } = await request(routeName);
            const { name } = data.data;
            this.routename = { name };
        } catch (err) {
            console.log("fetchRouteDataErr", err);
        }
    },
};