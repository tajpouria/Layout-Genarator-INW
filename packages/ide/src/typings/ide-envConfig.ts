export enum LayoutPattern {
    "XL" = "XL",
    "L" = "L",
    "SM" = "SM"
}

export enum PatternWeight {
    "XL" = 1,
    "L" = 0.5,
    "SM" = 0.25
}

export const definedKeybinding = ["1", "2", "3", "4", "5", "6", "7", "8", "s", "S", "m", "M", "x", "X", "l", "L", "/", "Backspace", "Delete", "ArrowLeft", "ArrowRight"];

export interface ILayoutTemplate {
    type: LayoutPattern;
    payload: number;
}

export const guide = {
    layoutGeneratorCoreEG:
        ".Eg XL: One extra-large layout. 2XL or XL/XL: Two extra-large layout. 4L or L/L/L/L: Four large Layout. XL/2L or XL/L/L: One extra-large layout and two large layout. XL/L/2SM: One extra-large layout and one large layout and two small layout."
};
