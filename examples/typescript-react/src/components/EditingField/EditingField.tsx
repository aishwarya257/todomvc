import React, {KeyboardEvent, forwardRef, FormEvent} from 'react';
import {ITodo} from '../../interfaces';
import Input from 'components/Input/Input';
import task from '../../constants/task';
import taskConstants from '../../constants/task';
import {getString, mergeValues} from './EditingField.Utils';

interface EditingFieldProps {
    todoItem: ITodo;
    onKeyDown: (event: KeyboardEvent) => void;
    onChange: (event: FormEvent) => void;
}

const EditingField = forwardRef<Array<HTMLInputElement>, EditingFieldProps>(
    ({todoItem, onKeyDown, onChange}, inputRefs) => {
        const {labels} = task;
        const badges = todoItem.badges;
        const values =
            typeof badges === 'string'
                ? getString(badges)
                : mergeValues(badges, taskConstants.displayDelimiter.badges);
        return (
            <div className="edit" tabIndex={0}>
                <span>
                    {todoItem.title} {values || ''}{' '}
                </span>
                {Object.keys(todoItem).map((key, index) => {
                    const value = todoItem[key];
                    return (
                        <div key={key}>
                            <span>{labels[key]}</span>
                            <Input
                                name={key}
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                value={value}
                                // @ts-ignore: Unreachable code error - Needs Attention
                                ref={(ref) => (inputRefs.current[index] = ref)}
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
