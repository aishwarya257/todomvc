export const mergeValues = (array: string[], delimiter: string): string => {
    if (!array || !delimiter || !array.length || array[0] === '') {
        return null;
    }
    return array.map((badge) => '@' + badge).join(' ');
};

export const getString = (str: string) => {
    const trimmedStr = str.trim();
    if (trimmedStr.length) {
        return mergeValues(trimmedStr.split(','), '@');
    }
    return '';
};
