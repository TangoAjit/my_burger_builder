import axios from 'axios';

const instance = axios.create({
    baseURL:'https://my-burger-builder-b7d91.firebaseio.com/',
})

export default instance;