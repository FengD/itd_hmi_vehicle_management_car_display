import Icestore from '@ice/store';
import userProfile from './userProfile';
import carData from './carData';
import routeName from './routeName';
import routeInfo from './routeInfo';

const icestore = new Icestore();
icestore.registerStore('userProfile', userProfile);
icestore.registerStore('carData', carData);
icestore.registerStore('routeName', routeName);
icestore.registerStore('routeInfo', routeInfo);

export default icestore;