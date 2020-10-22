const common = {
    pluralize(count: number, word: string): string {
        if (!count || !word) {
            return '';
        }
        return count === 1 ? word : word + 's';
    },
    removeDuplicates(array: Array<string>): Array<string> {
        if (!array) {
            return [];
        }
        return Array.from(new Set(array));
    }
};

export default common;
