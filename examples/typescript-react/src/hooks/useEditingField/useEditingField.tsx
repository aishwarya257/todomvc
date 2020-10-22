import {useState, useRef, useEffect} from 'react';
import common from 'utils/common';
import taskConstants from '../../constants/task';

function useEditingField(todo) {
    const [editFields, setEditFields] = useState(todo);
    const inputRefs = useRef<Array<HTMLInputElement>>([]);
    const getValues = useRef(() =>
        inputRefs.current.reduce((values, item) => {
            if (item) {
                const value = item?.value;
                const key = item?.name;
                const separator = taskConstants.editDelimiter[key];
                return {
                    ...values,
                    [key]: key === 'title' ? value : common.removeDuplicates(value.split(separator))
                };
            }
            return values;
        }, {})
    );
    useEffect(() => {
        setEditFields({...todo});
    }, [todo]);
    return {editFields, inputRefs, setEditFields, getValues: getValues.current};
}

export default useEditingField;
