import React, {forwardRef} from 'react';
import Input from 'components/Input/Input';
import task from '../../constants/task';

const EditingField = forwardRef(({todoItem, onKeyDown, onChange}, inputRefs) => {
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
                            ref={inputRefs.current[index]}
                        />
                    </div>
                );
            })}
        </div>
    );
});

EditingField.displayName = 'EditingField';

export default EditingField;
