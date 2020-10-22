import {Keys} from '../interfaces';
type taskConstantsProps = {
    editableFields: (string | Keys)[];
    displayDelimiter: {badges: string};
    editDelimiter: {
        badges: string;
    };
    labels: {title: string; badges: string};
};

const taskConstants: taskConstantsProps = {
    editableFields: Object.values(Keys),
    displayDelimiter: {
        badges: '@'
    },
    editDelimiter: {
        badges: ','
    },
    labels: {title: 'To-do', badges: 'Tags'}
};

export default taskConstants;
