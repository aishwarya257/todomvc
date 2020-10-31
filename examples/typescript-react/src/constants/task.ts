import {Keys} from '../interfaces';
type LabelsType = {[key in Keys]: string};
type SpecialCharacterType = {[key in Keys]?: string};

const taskConstants: {
    labels: LabelsType;
    editableFields: Keys[];
    displayDelimiter: SpecialCharacterType;
    editDelimiter: SpecialCharacterType;
} = {
    editableFields: [Keys.title, Keys.badges],
    displayDelimiter: {
        [Keys.badges]: '@'
    },
    editDelimiter: {
        [Keys.badges]: ','
    },
    labels: {[Keys.title]: 'To-do', [Keys.badges]: 'Tags'}
};

export default taskConstants;
