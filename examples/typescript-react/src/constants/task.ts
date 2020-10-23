import {Keys} from '../interfaces';

const taskConstants = {
    editableFields: ['title', 'badges'],
    displayDelimiter: {
        badges: '@'
    },
    editDelimiter: {
        badges: ','
    },
    labels: {title: 'To-do', badges: 'Tags'}
};

type myType = typeof taskConstants;

export default taskConstants;
