import {useRef, useState, useEffect} from 'react';
import keyCodes from '../../constants/keyCodes';

export default function useOutsideClick(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const [isEscape, setIsEscape] = useState(false);
    const ref = useRef(null);
    console.log(ref);
    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === keyCodes.ESCAPE) {
            setIsEscape(true);
            setIsComponentVisible(false);
        } else {
            setIsEscape(false);
        }
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref?.current?.contains(event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return {ref, isComponentVisible, setIsComponentVisible, isEscape};
}
