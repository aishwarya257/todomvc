import {RefObject, useEffect, useRef, MouseEvent} from 'react';

const useDocumentEvents = (
    ref: RefObject<HTMLElement>,
    callback: (event: Event) => void,
    eventType: keyof DocumentEventMap = 'click'
): void => {
    const handlerRef = useRef(callback);
    useEffect(() => {
        handlerRef.current = callback;
    });

    useEffect(() => {
        const listener = (ev: Event) => {
            if (ref && ref.current && !ref.current.contains(ev.target as Element)) {
                handlerRef.current(ev);
            }
        };

        document.addEventListener(eventType, listener);
        return () => document.removeEventListener(eventType, listener);
    });
};

export default useDocumentEvents;
