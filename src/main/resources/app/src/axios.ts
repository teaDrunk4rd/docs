import {store} from 'react-notifications-component';
import Cookies from 'js-cookie';

declare global {
    interface Window {
        axios: any;
    }
}

window.axios = require('axios');

window.axios.interceptors.request.use((config: any) => {
    config.url = `http://localhost:8080/api/${config.url}`;
    config.headers.Authorization = Cookies.get('token') || null;
    return config;
});

window.axios.interceptors.response.use((response: any) => {
    return response;
}, (error: any) => {
    let message: string;

    if (error.response && error.response.data.errors) {
        message = error.response.data.errors[0].defaultMessage;
    } else if (error.response && error.response.data.message) {
        message = error.response.data.message;
    } else if (error.response && error.response.status === 403) {
        message = "Доступ запрещён";
    } else if (error.response && error.response.status === 401) {
        localStorage.clear();
        // history.pushState({}, '', '/login'); // TODO: check it
        message = "Требуется авторизация";
    } else {
        message = "Произошла ошибка";
    }

    store.addNotification({
        title: 'Ошибка',
        message: message,
        type: "danger",
        container: "top-right",
        dismiss: { duration: 2000, onScreen: true }
    });

    return Promise.reject(error);
})
