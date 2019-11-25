import React from "react";

import Level from "./bulma/level";

import { appHomePage } from "../../const";
import strings from "../assets/locales";

/** Static footer with no dynamic code. */
export const Footer: React.FC = () => (
    <footer>
        <Level level>
            <Level levelItem>
                <a className="text link" href={appHomePage}>
                    {strings.app_versionString}
                </a>
            </Level>
        </Level>
    </footer>
);

export default Footer;
