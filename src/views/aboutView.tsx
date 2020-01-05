import React from "react";
import { RouteComponentProps } from "react-router-dom";

import Container from "./components/bulma/container";
import Level from "./components/bulma/level";
import Button from "./components/bulma/button";

import { getServerVersion } from "../actions/misc";
import strings from "./assets/locales";
import { appHomePage, amberHomePage } from "../const";

interface State {
    serverVersion: string;
}

class AboutView extends React.Component<RouteComponentProps, State> {
    state = {
        serverVersion: "unknown",
    };
    componentDidMount = async () => {
        let versionData = await getServerVersion();
        this.setState({ serverVersion: versionData.version });
    };
    render = () => (
        <Container>
            <Level level className="navbar">
                <Level levelItem levelLeft>
                    <Button
                        value={strings.btns_goBack}
                        onClick={this.props.history.goBack}
                    />
                </Level>
            </Level>
            <Container>
                <p>
                    {`${strings.app_fullVersionString(
                        this.state.serverVersion
                    )}. ${strings.about_licenseInfo}`}
                </p>
                <p>
                    {strings.about_linksParagraph}
                    <ul>
                        <li>
                            <a href={appHomePage}>
                                {strings.about_amberWebHomePage}
                            </a>
                        </li>
                        <li>
                            <a href={amberHomePage}>
                                {strings.about_amberHomePage}
                            </a>
                        </li>
                    </ul>
                </p>
            </Container>
        </Container>
    );
}

export default AboutView;
