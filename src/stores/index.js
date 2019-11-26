import Icestore from '@ice/store';
import userProfile from './userProfile';
import carData from './carData';

const icestore = new Icestore();
icestore.registerStore('userProfile', userProfile);
icestore.registerStore('carData', carData);

export default icestore;