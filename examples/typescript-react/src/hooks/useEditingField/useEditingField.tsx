import {useState, useRef, useEffect, createRef, useCallback} from 'react';
import taskConstants from '../../constants/task';

function useEditingField(todo) {
    const [editFields, setEditFields] = useState({});
    const keys = Object.keys(todo);
    const inputRefs = useRef([]);

    if (inputRefs.current.length !== keys.length) {
        inputRefs.current = Array(keys.length)
            .fill(null)
            .map((_, i) => inputRefs.current[i] || createRef());
    }
    
    const getValues = useRef(() =>
        inputRefs.current.reduce((values, item) => {
            const current = item?.current;
            const objectVal = current?.value;
            const key = current?.name;
            const separator = taskConstants.editDelimiter[key];
            if (current) {
                return {
                    ...values,
                    [key]: key === 'title' ? objectVal : objectVal.split(separator)
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
