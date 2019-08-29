import { takeEvery, put } from "redux-saga/effects";
import { Generator } from "../actions";
import { ExtractActionByType, onDownSideLayoutContainerChange, onUpSideLayoutContainerChange } from "../actions";
import { PatternWeight, LayoutPattern, ILayoutTemplate } from "../../typings/ide-envConfig";
import { Helper } from "@layout_generator/utility";

function* inputChangeRequestWorker(action: ExtractActionByType<Generator>) {
    try {
        const patterns: ILayoutTemplate[] = [];

        action.payload.layoutGeneratorInput.split("/").map((part: string) => {
            const splintedPart = part.split("");
            const parseToInt = parseInt(splintedPart[0], 10);

            let joinedPartType: string;
            /* setting joinedPartType */
            if (splintedPart[2]) {
                joinedPartType = [splintedPart[1], splintedPart[2]].join("");
            } else if (splintedPart[1]) {
                if (isNaN(parseToInt)) {
                    joinedPartType = [splintedPart[0], splintedPart[1]].join("");
                } else {
                    joinedPartType = [splintedPart[1]].join("");
                }
            } else {
                joinedPartType = [splintedPart[0]].join("");
            }

            if (!isNaN(parseToInt)) {
                /* if subPart is a number */
                for (let i = 1; i <= parseToInt; i++) {
                    patterns.push({ type: joinedPartType as LayoutPattern, payload: 1 });
                }
            } else {
                /* if subPart is not a number */
                patterns.push({ type: joinedPartType as LayoutPattern, payload: 1 });
            }
        });
        /* providing to bucket upside and downside in order to implicitly calculate weight and related stuffs */
        const upsideLayoutContainerPattern: any[] = [];
        const downsideLayoutContainerPattern: any[] = [];

        patterns.map(pattern => {
            const layOutWeight = PatternWeight[pattern.type];
            /* feeding buckets based on current weight :: seems like should whenEver first bucket reached max weight stating next bucket filling */
            const upsideLayoutContainerPatternWeight = upsideLayoutContainerPattern.reduce((a, b) => a + PatternWeight[b.type], 0);
            const downsideLayoutContainerPatternWeight = downsideLayoutContainerPattern.reduce((a, b) => a + PatternWeight[b.type], 0);

            if (upsideLayoutContainerPatternWeight + downsideLayoutContainerPatternWeight + layOutWeight <= 2) {
                if (upsideLayoutContainerPatternWeight + layOutWeight <= 1) {
                    upsideLayoutContainerPattern.push(pattern);
                } else {
                    downsideLayoutContainerPattern.push(pattern);
                }
            }
        });

        const groupedUpsideLayoutContainerPattern = Helper.JSON.groupBy(upsideLayoutContainerPattern, "type");
        const groupedDownsideLayoutContainerPattern = Helper.JSON.groupBy(downsideLayoutContainerPattern, "type");

        const upsideResult: ILayoutTemplate[] = [];
        const downsideResult: ILayoutTemplate[] = [];

        Object.keys(groupedUpsideLayoutContainerPattern).map((key: string) => {
            upsideResult.push({ type: key as LayoutPattern, payload: groupedUpsideLayoutContainerPattern[key].length });
        });
        Object.keys(groupedDownsideLayoutContainerPattern).map((key: string) => {
            downsideResult.push({ type: key as LayoutPattern, payload: groupedDownsideLayoutContainerPattern[key].length });
        });

        yield put(onUpSideLayoutContainerChange(upsideResult));
        yield put(onDownSideLayoutContainerChange(downsideResult));
    } catch (ex) {
        /* do nothing */
    }
}

export default function* generatorWatcher() {
    yield takeEvery(Generator.LAYOUT_GENERATOR_INPUT_CHANGE, inputChangeRequestWorker);
}
