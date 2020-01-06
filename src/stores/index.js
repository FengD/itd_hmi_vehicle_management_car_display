import Icestore from '@ice/store';
import carProfile from './carProfile';
import routeName from './routeName';
import routeInfo from './routeInfo';

const icestore = new Icestore();
icestore.registerStore('carProfile', carProfile);
icestore.registerStore('routeName', routeName);
icestore.registerStore('routeInfo', routeInfo);

export default icestore;