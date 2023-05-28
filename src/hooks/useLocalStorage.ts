import { useState } from "react";

export function useLocalStorage(key: string, initalValue: any) {

    const [state, setState] = useState(() => {

        const localStorageElement = localStorage.getItem(key);
        if (localStorageElement) {
            return JSON.parse(localStorageElement);
        }
        return initalValue;
    });

    function handleStateChange(newValue: any) {
        setState(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    }

    return [state, handleStateChange];
}