import React, { Component } from "react";
import uuid from "uuid/v4";

type LayoutContainerTypes = "layout-flex-container" | "layout-grid-container" | "layout-float-container";

export interface ILayoutUiOptions {
    layoutDirection?: string;
    layoutWrap?: string;
    layoutJustify?: string;
    layoutAlignItems?: string;
    layoutAlignContent?: string;
    layoutOrder?: number;
    layoutGrow?: number;
    layoutShrink?: number;
    layoutBasis?: string;
    layoutAlignSelf?: string;
    layoutGridInline?: string;
    layoutGridColumnTemplate?: string;
    layoutGridRowTemplate?: string;
    layoutGridColumnStart?: string;
    layoutGridTemplateAreas?: string;
    layoutGridColumnGap?: string;
    layoutGridRowGap?: string;
    layoutGridJustifyItems?: string;
    layoutGridAutoColumns?: string | number;
    layoutGridAutoRows?: string | number;
    layoutGridAutoFlow?: string | number;
    layoutGridColumnEnd?: string | number;
    layoutGridRowStart?: string | number;
    layoutGridRowEnd?: string | number;
    layoutGridArea?: string;
    layoutGridJustifySelf?: string;
    layoutFloatDirection?: string;
    layoutFloatClear?: string;
}

interface IUiLayoutSchema {
    id?: string;
    className?: string;
    widget?: LayoutContainerTypes;
    about?: string;
    uiOptions?: ILayoutUiOptions;
}

class LayoutWidget extends Component<IUiLayoutSchema> {
    public getFlexContainerStyles = (): object => {
        const { uiOptions } = this.props;

        return {
            display: "flex",
            flexDirection: (uiOptions && uiOptions.layoutDirection) || "row", // row | row-reverse | column | column-reverse
            flexWrap: (uiOptions && uiOptions.layoutWrap) || "nowrap", // nowrap | wrap | wrap-reverse;
            justifyContent: (uiOptions && uiOptions.layoutJustify) || "flex-start", // flex-start | flex-end | center | space-between | space-around | space-evenly;
            alignItems: (uiOptions && uiOptions.layoutAlignItems) || "stretch", // stretch | flex-start | flex-end | center | baseline;
            alignContent: (uiOptions && uiOptions.layoutAlignContent) || "stretch" // flex-start | flex-end | center | space-between | space-around | stretch;
        };
    };

    public getFlexItemStyles = (): object => {
        const { uiOptions } = this.props;

        return {
            order: (uiOptions && uiOptions.layoutOrder) || 0,
            flexGrow: (uiOptions && uiOptions.layoutGrow) || 0,
            flexShrink: (uiOptions && uiOptions.layoutShrink) || 0,
            flexBasis: (uiOptions && uiOptions.layoutBasis) || "auto",
            alignSelf: (uiOptions && uiOptions.layoutAlignSelf) || "auto"
        };
    };

    public getFlexStyles = (isContainer: boolean): object => {
        return isContainer ? this.getFlexContainerStyles() : this.getFlexItemStyles();
    };

    public getGridContainerStyles = (): object => {
        const { uiOptions } = this.props;

        return {
            display: uiOptions && uiOptions.layoutGridInline ? "inline-grid" : "grid", // grid | inline-grid;
            gridTemplateColumns: (uiOptions && uiOptions.layoutGridColumnTemplate) || "auto",
            gridTemplateRows: (uiOptions && uiOptions.layoutGridRowTemplate) || "auto",
            gridColumnStart: (uiOptions && uiOptions.layoutGridColumnStart) || "unset",
            gridTemplateAreas: (uiOptions && uiOptions.layoutGridTemplateAreas) || "",
            gridColumnGap: (uiOptions && uiOptions.layoutGridColumnGap) || 0,
            gridRowGap: (uiOptions && uiOptions.layoutGridRowGap) || 0,
            justifyItems: (uiOptions && uiOptions.layoutGridJustifyItems) || "start", // start | end | center | stretch;
            justifyContent: (uiOptions && uiOptions.layoutJustify) || "flex-start", // flex-start | flex-end | center | space-between | space-around | space-evenly;
            alignItems: (uiOptions && uiOptions.layoutAlignItems) || "stretch", // stretch | flex-start | flex-end | center | baseline;
            alignContent: (uiOptions && uiOptions.layoutAlignContent) || "stretch", // flex-start | flex-end | center | space-between | space-around | stretch;
            gridAutoColumns: uiOptions && uiOptions.layoutGridAutoColumns,
            gridAutoRows: uiOptions && uiOptions.layoutGridAutoRows,
            gridAutoFlow: uiOptions && uiOptions.layoutGridAutoFlow,
            placeItems: "unset",
            placeContent: "unset"
        };
    };

    public getGridItemStyles = (): object => {
        const { uiOptions } = this.props;

        return {
            gridColumnStart: (uiOptions && uiOptions.layoutGridColumnStart) || "col-start",
            gridColumnEnd: uiOptions && uiOptions.layoutGridColumnEnd,
            gridRowStart: uiOptions && uiOptions.layoutGridRowStart,
            gridRowEnd: uiOptions && uiOptions.layoutGridRowEnd,
            gridArea: uiOptions && uiOptions.layoutGridArea,
            justifySelf: uiOptions && uiOptions.layoutGridJustifySelf,
            alignSelf: (uiOptions && uiOptions.layoutAlignSelf) || "auto"
        };
    };

    public getGridStyles = (isContainer: boolean): object => {
        return isContainer ? this.getGridContainerStyles() : this.getGridItemStyles();
    };

    public getFloatContainerStyles = (): object => {
        const { uiOptions } = this.props;

        return {
            clear: (uiOptions && uiOptions.layoutFloatClear) || "both",
            "&:after": {
                content: " ",
                display: "block",
                clear: (uiOptions && uiOptions.layoutFloatClear) || "both"
            }
        };
    };

    public getFloatItemStyles = (): object => {
        const { uiOptions } = this.props;

        return {
            float: (uiOptions && uiOptions.layoutFloatDirection) || "left"
        };
    };

    public getFloatStyles = (isContainer: boolean): object => {
        return isContainer ? this.getFloatContainerStyles() : this.getFloatItemStyles();
    };

    public getStyles = (): object => {
        const { widget } = this.props;
        let layoutStyles = {};

        switch (widget) {
            default:
            case "layout-flex-container":
                layoutStyles = this.getFlexStyles(widget === "layout-flex-container");
                break;
            case "layout-grid-container":
                layoutStyles = this.getGridStyles(widget === "layout-grid-container");
                break;
            case "layout-float-container":
                layoutStyles = this.getFloatStyles(widget === "layout-float-container");
                break;
        }

        return {
            ...layoutStyles
        };
    };

    public render() {
        const { id, children, className, about } = this.props;
        return (
            <div about={about} className={className} key={id || uuid()} style={this.getStyles()}>
                {children}
            </div>
        );
    }
}

export default LayoutWidget;
