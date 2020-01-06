import { request } from '@/utils/request';
import { routeName } from '@/config/dataSource';

export default {
    routeNameID: [],
    async fetchRouteData() {
        try {
            const { data } = await request(routeName);
            this.routeNameID = { data };
        } catch (err) {
            console.log("fetchRouteDataErr", err);
        }
    },
};