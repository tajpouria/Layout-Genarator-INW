import { KeyboardEvent } from "react";

/**
 *
 * TODO: check of user pressed defined key of not prevent default behavior
 *
 * @param {event} React.KeyboardEvent
 * @returns {boolean}
 */
export const isPressedDefinedKey = (event: KeyboardEvent, definedKey: string[]): boolean => definedKey.indexOf(event.key) !== -1;
