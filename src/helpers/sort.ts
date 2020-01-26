type Map = { [key: string]: any };

/**
 * Sorts any array given the list of attributes in order of descending priority.
 * Uses bubble sort algorithm to sort the array. Returns a new array.
 * @param a The array of things to sort
 * @param attrs The attributes in order of descending priority
 */
export const sortByAttrs = <T extends Map>(a: T[], ...attrs: (keyof T)[]) => {
    // the single edge case
    if (a.length === 0) {
        return [];
    }
    const arr = [...a];
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j < arr.length - 1; j++) {
            attrs.forEach((attr) => {
                if (arr[j][attr] > arr[j + 1][attr]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            });
        }
    }
    return arr;
};
