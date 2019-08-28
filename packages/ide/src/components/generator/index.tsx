import React, { useEffect, useState } from "react";

import { Layout, ILayoutUiOptions, Paper, Typography } from "@layout_generator/utility";
import { LayoutPattern, ILayoutTemplate } from "../../typings/ide-envConfig";

interface IProps {
    layoutPatterns?: Array<{ type: LayoutPattern; payload: number }>;
}

const Generator = ({ layoutPatterns }: IProps) => {
    const [patternCounter, setPatternCounter] = useState({});

    useEffect(() => {
        if (layoutPatterns && layoutPatterns.length) {
            let patternCount = {};
            layoutPatterns.forEach(async ({ type, payload }: ILayoutTemplate) => {
                patternCount = { ...patternCount, [LayoutPattern[type]]: payload };
            });
            setPatternCounter(patternCount);
        }
    }, [layoutPatterns]);

    const uiOptions: { [propName: string]: ILayoutUiOptions } = {
        xl: {
            layoutGridRowTemplate: "1fr"
        },
        l: {
            layoutGridRowTemplate: patternCounter[LayoutPattern.SM] ? "unset" : "1fr 1fr"
        },
        sm: {
            layoutGridRowTemplate: patternCounter[LayoutPattern.SM] > 2 || patternCounter[LayoutPattern.L] ? "unset" : "1fr 1fr",
            layoutGridColumnTemplate: "1fr 1fr"
        }
    };

    const renderPaper = (payload: number): JSX.Element[] => {
        const papers = [];
        for (let i = 1; i <= payload; i++) {
            papers.push(
                <Paper className="generator-paper" elevation={4} key={i}>
                    <Typography variant="h4" align="center">
                        Slot
                    </Typography>
                </Paper>
            );
        }
        return papers;
    };
    const renderLayouts = (): JSX.Element[] | undefined => {
        if (layoutPatterns && layoutPatterns.length) {
            return [
                ...layoutPatterns.map((pattern: ILayoutTemplate, index: number): JSX.Element | undefined => {
                    switch (pattern.type) {
                        case LayoutPattern.XL:
                            return (
                                <Layout about="XL" key={index} widget="layout-grid-container" uiOptions={uiOptions.xl}>
                                    {renderPaper(pattern.payload)}
                                </Layout>
                            );
                        case LayoutPattern.L:
                            return (
                                <Layout about="L" key={index} widget="layout-grid-container" uiOptions={uiOptions.l}>
                                    {renderPaper(pattern.payload)}
                                </Layout>
                            );
                        case LayoutPattern.SM:
                            return (
                                <Layout about="SM" key={index} widget="layout-grid-container" uiOptions={uiOptions.sm}>
                                    {renderPaper(pattern.payload)}
                                </Layout>
                            );
                        default:
                            return undefined;
                    }
                })
            ] as JSX.Element[];
        }
        return undefined;
    };

    return <>{layoutPatterns && layoutPatterns.length ? renderLayouts() : undefined}</>;
};

export default Generator;
