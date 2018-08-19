import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-backend-95470.firebaseio.com/'
});


export default instance;