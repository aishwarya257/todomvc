import {useState, useRef, useEffect, MutableRefObject, Dispatch, SetStateAction} from 'react';
import common from 'utils/common';
import {Keys, SlicedStateProps} from '../../interfaces';
import taskConstants from '../../constants/task';

interface useEditingFieldProps {
    editFields: SlicedStateProps;
    inputRefs: MutableRefObject<HTMLInputElement[]>;
    setEditFields: Dispatch<SetStateAction<SlicedStateProps>>;
    getValues: () => SlicedStateProps;
}

function useEditingField(todo: SlicedStateProps): useEditingFieldProps {
    const [editFields, setEditFields] = useState(todo);
    const inputRefs = useRef<Array<HTMLInputElement>>([]);
    const getValues = useRef(() =>
        inputRefs.current.reduce(
            (values, item) => {
                if (item) {
                    const {value, name: key} = item;
                    const separator = taskConstants.editDelimiter[key as Keys];
                    return {
                        ...values,
                        [key]: separator ? common.removeDuplicates(value.split(separator)) : value
                    };
                }
                return values;
            },
            {badges: [], title: ''}
        )
    );
    useEffect(() => {
        setEditFields({...todo});
    }, [todo]);
    return {editFields, inputRefs, setEditFields, getValues: getValues.current};
}

export default useEditingField;
