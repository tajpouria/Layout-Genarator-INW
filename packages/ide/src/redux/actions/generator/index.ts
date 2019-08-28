import { IGeneratorAction, Generator } from "./action-type";
import { IGenerator } from "src/typings/generator";
import { ILayoutTemplate } from "src/typings/ide-envConfig";


export * from "./action-type";

export const onChange = (payload: IGenerator): IGeneratorAction => ({ type: Generator.LAYOUT_GENERATOR_INPUT_CHANGE, payload });
export const onUpSideLayoutContainerChange = (payload: ILayoutTemplate[]): IGeneratorAction => ({ type: Generator.LAYOUT_GENERATOR_UPSIDE_LAYOUT_CONTAINER_UPDATE, payload });
export const onDownSideLayoutContainerChange = (payload: ILayoutTemplate[]): IGeneratorAction => ({ type: Generator.LAYOUT_GENERATOR_DOWNSIDE_LAYOUT_CONTAINER_UPDATE, payload });
