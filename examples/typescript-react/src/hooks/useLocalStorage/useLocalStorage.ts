import {useState} from 'react';

export default function useLocalStorage(
    key: string,
    initialValue = ''
): [string, (item: string) => void] {
    const [item, setValue] = useState(() => {
        const value = window.localStorage.getItem(key) || initialValue;
        window.localStorage.setItem(key, value);
        return value;
    });
    const setItem = (item: string) => {
        setValue(item);
        window.localStorage.setItem(key, item);
    };
    return [item, setItem];
}
