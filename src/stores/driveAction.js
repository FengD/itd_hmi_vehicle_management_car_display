import { Message } from '@alifd/next';
import { request } from '@/utils/request';
import { serverIp } from '../config/settings';

const driveAction = {
    baseURL: `http://${serverIp}`,
    url: '/car/%s from f/profile',
    method: 'POST',
    headers: { token: "%s from f" },
};

export default {
    actionRes: [],
    async handleDriveAction(token, carName, routeId, action, cb) {
        driveAction.headers = { token };
        driveAction.url = `/carDisplay/send?carName=${carName}&path=${routeId}&advSwitch=${action}`;
        try {
            const { data } = await request(driveAction);
            this.actionRes = data;
            cb(this.actionRes.message);
        } catch (err) {
            console.log("driveRequestErr", err);
            Message.show({
                type: 'error',
                title: '错误消息',
                content: '网络请求失败',
            });
        }
    },
};
