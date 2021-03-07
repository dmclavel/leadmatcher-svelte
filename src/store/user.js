import { writable } from 'svelte/store';

export const createUserData = () => {
    const { subscribe, set, update } = writable({});

    return {
        subscribe,
        setUserData: (data) => {
            set(data);
        },
        updateUserData: (newData) => {

        },
    };
};

const createToken = () => {
    const { subscribe, set } = writable(null);

    return {
        subscribe,
        setToken: (token) => {
            set(token);
        },
        removeToken: () => {
            set(null);
        },
    };
};

export const userData = createUserData();
export const token = createToken();