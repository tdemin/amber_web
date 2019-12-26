import React, { useState } from "react";

import Level from "./bulma/level";

import { getServerVersion } from "../../actions/misc";
import { appHomePage, amberHomePage } from "../../const";
import strings from "../assets/locales";

export const Footer: React.FC = () => {
    const [version, setVersion] = useState("unknown");
    getServerVersion().then((r) => setVersion(r.version));
    return (
        <footer>
            <Level level>
                <Level levelItem className="footer_links">
                    <a className="text link" href={appHomePage}>
                        {`${strings.app_versionString}`}
                    </a>
                    <a className="text link" href={amberHomePage}>
                        {`${strings.amber_versionString}${version}`}
                    </a>
                </Level>
            </Level>
        </footer>
    );
};

export default React.memo(Footer);
