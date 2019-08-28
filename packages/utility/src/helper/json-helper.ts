/**
 *
 * Is an index or number.
 *
 * Optionally remove the value
 *
 * @param {string} string
 */
export const isIndex = (str: string) => /^\d+$/.test(str);

/**
 *
 * Group an array of object based on provided prop
 *
 *
 * @param {objectArray} Array<{}>
 * @param {property} string<{}>
 */

export const groupBy = (objectArray: Array<{}>, property: string) => {
    return objectArray.reduce((total, obj) => {
        const key = obj[property];
        if (!total[key]) {
            total[key] = [];
        }
        total[key].push(obj);
        return total;
    }, {});
};
