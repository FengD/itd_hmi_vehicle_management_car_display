import Icestore from '@ice/store';
import carProfile from './carProfile';
import routeName from './routeName';
import routeInfo from './routeInfo';

const iceStore = new Icestore();
iceStore.registerStore('carProfile', carProfile);
iceStore.registerStore('routeName', routeName);
iceStore.registerStore('routeInfo', routeInfo);

export default iceStore;