import { AxiosResponse } from "axios";

import req from "../axios";
import { VersionData } from "../helpers/api";

export const getServerVersion = async () => {
    let versionData: VersionData | undefined;
    await req.get("/version").then(
        (r: AxiosResponse) => (versionData = r.data),
        () => (versionData = undefined)
    );
    return versionData;
};
