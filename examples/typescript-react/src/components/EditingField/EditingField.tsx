import React, {KeyboardEvent, forwardRef, FormEvent, Ref} from 'react';
import {ITodo} from '../../interfaces';
import Input from 'components/Input/Input';
import task from '../../constants/task';

interface EditingFieldProps {
    todoItem: ITodo;
    onKeyDown: (event: KeyboardEvent) => void;
    onChange: (event: FormEvent) => void;
}

const EditingField = forwardRef<Array<HTMLInputElement>, EditingFieldProps>(
    ({todoItem, onKeyDown, onChange}, inputRefs) => {
        const {labels} = task;
        return (
            <div className="edit" tabIndex={0}>
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
