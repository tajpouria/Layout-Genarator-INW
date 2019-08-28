import { LayoutPattern } from "./ide-envConfig";

export interface IGenerator {
    layoutGeneratorInput: string;
    upSideLayoutPatterns?: LayoutPattern[];
    downSideLayoutPatterns?: LayoutPattern[];
}
