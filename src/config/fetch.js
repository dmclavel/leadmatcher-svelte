export default function (url, fetchData) {
    const apiURL = __SVELTE_ENV__.env.NODE_ENV === 'production' ? __SVELTE_ENV__.env.PROD_API_URL : __SVELTE_ENV__.env.DEV_API_URL;
    let addedHeaders = {};

    if (!/(login|signup)/.test(url)) {
        const localToken = window.localStorage.getItem('x-auth-token');

        if (localToken == null || localToken === undefined) {
            return Promise.reject(
                new Error('No token stored')
            );
        }

        addedHeaders = {
            headers: new Headers([
                [
                    'Authorization',
                    `Bearer ${localToken}`
                ]
            ])
        };
    }

    return fetch(`${apiURL}${url}`, {
        ...fetchData,
        ...addedHeaders
    });
};