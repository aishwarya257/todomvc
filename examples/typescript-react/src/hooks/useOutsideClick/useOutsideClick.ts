import {useRef, useState, useEffect, Ref, Dispatch, SetStateAction} from 'react';
import keyCodes from '../../constants/keyCodes';

interface useOutsideClickProps {
    ref: Ref<HTMLLIElement>;
    isComponentVisible: boolean;
    isEscape: boolean;
    setIsComponentVisible: Dispatch<SetStateAction<boolean>>;
}

export default function useOutsideClick(initialIsVisible: boolean): useOutsideClickProps {
    const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialIsVisible);
    const [isEscape, setIsEscape] = useState<boolean>(false);
    const ref = useRef<HTMLLIElement>(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === keyCodes.ESCAPE) {
            setIsEscape(true);
            setIsComponentVisible(false);
        } else {
            setIsEscape(false);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(<HTMLElement>event.target)) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('mousedown', handleClickOutside, true);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    });

    return {ref, isComponentVisible, setIsComponentVisible, isEscape};
}
