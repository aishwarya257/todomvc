import {useState} from 'react';

export default function useLocalStorage(
    key: string,
    initialValue = ''
): [string, (item: string) => void] {
    const [item, setValue] = useState(() => {
        const value = localStorage.getItem(key) || initialValue;
        localStorage.setItem(key, value);
        return value;
    });
    const setItem = (item: string) => {
        setValue(item);
        window.localStorage.setItem(key, item);
    };
    return [item, setItem];
}
