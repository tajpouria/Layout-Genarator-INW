import React, { Component } from "react";

/**
 * Internal Imports
 */
import { Layout, ILayoutUiOptions } from "@layout_generator/utility";
import { connect } from "react-redux";
import Generator from "../generator";

interface IProps {
    upSideLayoutPatterns: [];
    downSideLayoutPatterns: [];
}

@connect(state => {
    return { ...(state.generator || {}) };
})
class Preview extends Component<IProps> {
    protected uiOptions: { [propName: string]: ILayoutUiOptions } = {
        container: {
            layoutGridRowTemplate: "1fr 1fr"
        }
    };
    public render() {
        const { upSideLayoutPatterns, downSideLayoutPatterns } = this.props;
        return (
            <Layout className="preview-layout-container" widget="layout-grid-container">
                <Layout className="preview-layout-subContainer" widget="layout-grid-container">
                    <Generator layoutPatterns={upSideLayoutPatterns} />
                </Layout>
                <Layout className="preview-layout-subContainer" widget="layout-grid-container">
                    <Generator layoutPatterns={downSideLayoutPatterns} />
                </Layout>
            </Layout>
        );
    }
}

export default Preview as React.ComponentClass<{}>;
