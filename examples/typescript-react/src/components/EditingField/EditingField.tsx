import React, {KeyboardEvent, forwardRef, FormEvent, MutableRefObject, ChangeEvent} from 'react';
import {Keys, SlicedStateProps} from '../../interfaces';
import Input from 'components/Input/Input';
import task from '../../constants/task';
import taskConstants from '../../constants/task';
import {mergeValues} from './EditingField.Utils';

interface EditingFieldProps {
    todoItem: SlicedStateProps;
    onKeyDown: (event: KeyboardEvent) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const EditingField = forwardRef<Array<HTMLInputElement>, EditingFieldProps>(
    ({todoItem, onKeyDown, onChange}, inputRefs) => {
        const {labels} = task;
        const badges = todoItem.badges;
        const values = mergeValues(badges, taskConstants.displayDelimiter[Keys.badges]);
        return (
            <div className="edit" tabIndex={0}>
                <span>
                    {todoItem.title} {values || ''}{' '}
                </span>
                {Object.keys(todoItem).map((key, index) => {
                    const value = todoItem[key as Keys];
                    return (
                        <div key={key}>
                            <span>{labels[key as Keys]}</span>
                            <Input
                                name={key}
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                value={value}
                                ref={(ref) =>
                                    ((inputRefs as MutableRefObject<HTMLInputElement[]>).current[
                                        index
                                    ] = ref as HTMLInputElement)
                                }
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
);

EditingField.displayName = 'EditingField';

export default EditingField;
