import {ITodo, Keys, SlicedStateProps} from './../../interfaces';
import {useState, useEffect, useRef} from 'react';

export default function useSlicedState(state: ITodo, requiredKeys: Keys[]): SlicedStateProps {
    const editableKeys = useRef(requiredKeys);
    const [slicedState, setSlicedState] = useState(<SlicedStateProps>{});

    useEffect(() => {
        const sliced = editableKeys.current.reduce(
            (subState, key) => ({
                ...subState,
                [key]: state[key]
            }),
            <SlicedStateProps>{}
        );
        setSlicedState(sliced);
    }, [state]);
    return slicedState;
}
