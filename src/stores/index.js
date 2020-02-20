import Icestore from '@ice/store';
import carProfile from './carProfile';
import routeName from './routeName';
import routeInfo from './routeInfo';
import driveAction from './driveAction';

const iceStore = new Icestore();
iceStore.registerStore('carProfile', carProfile);
iceStore.registerStore('routeName', routeName);
iceStore.registerStore('routeInfo', routeInfo);
iceStore.registerStore('driveAction', driveAction);

export default iceStore;