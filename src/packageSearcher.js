import axios from 'axios';

const packageSearcher = ({ term, size = 50 }) => axios.get(`https://registry.npmjs.org/-/v1/search?text=${term}&size=${size}`);

export default packageSearcher;
