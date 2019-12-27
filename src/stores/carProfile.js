import { request } from '@/utils/request';
import { carProfile } from '@/config/dataSource';

export default {
    carinfo: {
        name: '',
        department: '',
        avatar: '',
    },
    carid: '',

    async fetchData() {
        try {
            const { data } = await request(carProfile);
            const { name, department, avatar, carid } = data.data;
            this.userinfo = { name, department, avatar };
            this.carid = carid;
        } catch (err) {
            console.log("fetchDataErr", err);
        }
    },
};
