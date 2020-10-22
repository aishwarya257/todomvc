import {useRef, useState, useEffect, Ref, Dispatch, SetStateAction, MutableRefObject} from 'react';
import keyCodes from '../../constants/keyCodes';

interface useDocumentEventsProps {
    ref: MutableRefObject<HTMLElement>;
    clickedInside: boolean;
    isEscape: boolean;
    setClickedInside: Dispatch<SetStateAction<boolean>>;
}

export default function useDocumentEvents(initialIsVisible = false): useDocumentEventsProps {
    const [clickedInside, setClickedInside] = useState<boolean>(initialIsVisible);
    const [isEscape, setIsEscape] = useState<boolean>(false);
    const ref = useRef<HTMLElement | null>(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
        if (event.key === keyCodes.ESCAPE) {
            setIsEscape(true);
            setClickedInside(false);
        } else {
            setIsEscape(false);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(<HTMLElement>event.target)) {
            setClickedInside(false);
        } else {
            setClickedInside(true);
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

    return {ref, clickedInside, setClickedInside, isEscape};
}
