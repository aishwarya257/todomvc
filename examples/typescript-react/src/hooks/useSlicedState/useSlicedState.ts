import {ITodo, Keys} from './../../interfaces';
import {useState, useEffect} from 'react';
type useSlicedStateProps = {[key in Keys]: string | Array<string>};

export default function useSlicedState(state: ITodo, requiredKeys: Keys[]): useSlicedStateProps {
    const [slicedState, setSlicedState] = useState<useSlicedStateProps>({});
    useEffect(() => {
        const keys = Object.keys(state);
        const sliced = keys.reduce((subState, key) => {
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
