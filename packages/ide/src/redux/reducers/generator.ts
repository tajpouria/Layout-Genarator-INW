import { Action } from "../actions";
import { Generator } from "../actions";
import { IGenerator } from "src/typings/generator";

const initialState: IGenerator = {
    layoutGeneratorInput: "",
    upSideLayoutPatterns: [],
    downSideLayoutPatterns: []
};

export const generatorReducer = (state: IGenerator = initialState, action: Action): IGenerator => {
    switch (action.type) {
        case Generator.LAYOUT_GENERATOR_INPUT_CHANGE:
            return { ...state, ...action.payload };
        case Generator.LAYOUT_GENERATOR_UPSIDE_LAYOUT_CONTAINER_UPDATE:
            return { ...state, upSideLayoutPatterns: action.payload };
        case Generator.LAYOUT_GENERATOR_DOWNSIDE_LAYOUT_CONTAINER_UPDATE:
            return { ...state, downSideLayoutPatterns: action.payload };
        default:
            return state;
    }
};
