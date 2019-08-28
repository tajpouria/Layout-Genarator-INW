/**
 * External Imports
 */
import React, { Component, KeyboardEvent, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Layout, ILayoutUiOptions, SearchField, PersistentDrawer, Helper, Typography } from "@layout_generator/utility";

/**
 * Internal Imports
 */
import { definedKeybinding, guide } from "../../typings/ide-envConfig";
import { onChange } from "src/redux/actions";
import Preview from "../preview";

interface ICoreState {
    values: {
        layoutGeneratorInput: string;
    };
}
type Props = Actions<typeof actions & { layoutGeneratorInput: string }>;

const actions = { layoutGeneratorOnChange: onChange };

@connect(
    state => {
        return { ...(state.generator || {}) };
    },
    actions
)
class Core extends Component<Props, ICoreState> {
    protected uiOptions: ILayoutUiOptions = {
        layoutGridColumnTemplate: "1fr"
    };
    protected definedKeyBinding = definedKeybinding;

    public render() {
        const { layoutGeneratorInput } = this.props;
        return (
            <PersistentDrawer
                title="Layout Generator"
                openWhenComponentMount={true}
                drawerUpSideChildren={
                    <SearchField
                        name="layoutGeneratorInput"
                        value={layoutGeneratorInput}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        autoFocus={true}
                        required={true}
                        placeholder="Type Mentioned Stuff..."
                    />
                }
                drawerDownSideChildren={
                    <Typography variant="body2">
                        {guide.layoutGeneratorCoreEG}
                    </Typography>
                }
            >
                <Layout className="core-layout-container">
                    <Preview />
                </Layout>
            </PersistentDrawer>
        );
    }

    private handleChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        this.props.layoutGeneratorOnChange({ layoutGeneratorInput: event.target.value.toUpperCase() });
    };

    private handleKeyDown = (event: KeyboardEvent): void => {
        if (!Helper.IDE.isPressedDefinedKey(event, this.definedKeyBinding)) {
            event.preventDefault();
        }
    };
}

export default Core as React.ComponentClass<{}>;
