import axios from "axios";

import { baseURI, networkTimeout } from "./const";

const req = axios.create({
    baseURL: baseURI,
    timeout: networkTimeout,
});

export default req;
