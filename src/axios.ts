import axios from "axios";

import { baseURI } from "./const";

const req = axios.create({
    baseURL: baseURI,
});

export default req;
