import common from 'utils/common';
import taskConstants from '../../constants/task';
import {Keys, SlicedStateProps} from '../../interfaces';

export const separateBadgesAndTask = (task: string): SlicedStateProps | null => {
    if (!task) {
        return null;
    }
    const badgeDelimiter = taskConstants.displayDelimiter[Keys.badges];
    if (!badgeDelimiter) {
        return null;
    }
    const splitted = task.split(badgeDelimiter);
    const title = splitted[0].trim();
    if (!title.length) {
        return null;
    }
    const values = splitted.slice(1).reduce((filtered: string[], badge: string) => {
        const text = badge.trim();
        return text.length ? [...filtered, text] : filtered;
    }, []);
    return {
        title,
        badges: common.removeDuplicates(values)
    };
};
