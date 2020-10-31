import {ITodo, Keys, SlicedStateProps} from './../../interfaces';
import {useState, useEffect} from 'react';

export default function useSlicedState(state: ITodo, requiredKeys: Keys[]): SlicedStateProps {
    const [slicedState, setSlicedState] = useState(<SlicedStateProps>{});
    useEffect(() => {
        const sliced = requiredKeys.reduce(
            (subState, key) => ({
                ...subState,
                [key]: state[key]
            }),
            <SlicedStateProps>{}
        );
        setSlicedState(sliced);
    }, [requiredKeys, state]);
    return slicedState;
}
