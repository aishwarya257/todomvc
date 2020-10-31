export const mergeValues = (array: string[], delimiter: string | undefined): string => {
    if (!array || !delimiter || !array.length || array[0] === '') {
        return '';
    }
    return array.map((badge) => delimiter + badge).join(' ');
};
