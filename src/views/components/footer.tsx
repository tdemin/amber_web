import React from "react";

import Level from "./bulma/level";
import Link from "./link";

import strings from "../assets/locales";

export const Footer: React.FC = () => (
    <footer>
        <Level level>
            <Level levelItem className="footer_links">
                <Link to="/about">{strings.app_versionString}</Link>
            </Level>
        </Level>
    </footer>
);

export default React.memo(Footer);
