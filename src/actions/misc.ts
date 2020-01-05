import req from "../axios";
import { VersionData } from "../typings/api";

const EmptyData = {
    signup: false,
    version: "unknown",
};

export const getServerVersion = async () => {
    let versionData: VersionData = EmptyData;
    await req.get("/version").then(
        (r) => (versionData = r.data),
        () => (versionData = EmptyData)
    );
    return versionData;
};
