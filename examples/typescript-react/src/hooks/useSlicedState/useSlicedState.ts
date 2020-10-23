import {ITodo, Keys} from './../../interfaces';
import {useState, useEffect} from 'react';
type useSlicedStateProps = {[key in Keys]: string | Array<string>};

export default function useSlicedState(state: ITodo, requiredKeys: string[]): useSlicedStateProps {
    const [slicedState, setSlicedState] = useState({
        title: '',
        badges: []
    });
    useEffect(() => {
        const sliced = requiredKeys.reduce(
            (subState, key) => {
                return {
                    ...subState,
                    [key]: state[key]
                };
            },
            {title: '', badges: []}
        );
        setSlicedState(sliced);
    }, [requiredKeys, state]);
    return slicedState;
}
