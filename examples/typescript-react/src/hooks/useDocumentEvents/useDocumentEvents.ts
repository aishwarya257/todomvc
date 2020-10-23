import {RefObject, useEffect, useRef} from 'react';

type ListenerEvent = MouseEvent & {
    target: Element;
};

const useDocumentEvents = (
    ref: RefObject<HTMLElement>,
    callback: (event: MouseEvent) => void,
    eventType = 'click'
): void => {
    const handlerRef = useRef(callback);
    useEffect(() => {
        handlerRef.current = callback;
    });

    useEffect(() => {
        const listener = (event: ListenerEvent) => {
            if (ref && ref.current && !ref.current.contains(event.target)) {
                handlerRef.current(event);
            }
        };

        document.addEventListener(eventType, listener);
        return () => {
            document.removeEventListener(eventType, listener);
        };
    });
};

export default useDocumentEvents;
