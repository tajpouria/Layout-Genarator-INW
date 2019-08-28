import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Core from "src/components/core";

class App extends Component {
    public render() {
        return (
            <Switch>
                <Route path="/" exact={false} component={Core} />
            </Switch>
        );
    }
}

export default App as React.ComponentClass<{}>;
