import common from 'utils/common';
import taskConstants from '../../constants/task';
export const separateBadgesAndTask = (
    task: string
): null | {title: string; badges: Array<string>} => {
    if (!task) {
        return null;
    }
    const splitted = task.split(taskConstants.displayDelimiter.badges);
    const title = splitted[0].trim();
    if (!title.length) {
        return null;
    }
    const values = splitted.slice(1).reduce((filtered, badge) => {
        const text = badge.trim();
        return text.length ? [...filtered, text] : filtered;
    }, []);
    return {
        title,
        badges: common.removeDuplicates(values)
    };
};