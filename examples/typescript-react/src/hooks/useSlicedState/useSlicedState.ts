import {useState, useEffect} from 'react';

export default function useSlicedState(state, requiredKeys) {
    const [slicedState, setSlicedState] = useState({});
    useEffect(() => {
        const sliced = Object.keys(state).reduce((subState, key) => {
            if (requiredKeys.includes(key)) {
                return {
                    ...subState,
                    [key]: state[key]
                };
            }
            return subState;
        }, {});
        setSlicedState(sliced);
    }, [requiredKeys, state]);
    return slicedState;
}
