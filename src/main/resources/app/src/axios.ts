import {store} from 'react-notifications-component';
import Cookies from 'js-cookie';
import axios from "axios";

function isValidMessage(message: string){
    return /^[А-Яа-я0-9 _]*[А-Яа-я0-9][А-Яа-я0-9 _]*$/.test(message);
}

axios.interceptors.request.use((config: any) => {
    config.url = `http://localhost:8080/api/${config.url}`;
    config.headers.Authorization = Cookies.get('token') || null;
    return config;
});

axios.interceptors.response.use((response: any) => {
    return response;
}, (error: any) => {
    let message: string;
    if (error.response && error.response.data.errors && isValidMessage(error.response.data.errors[0].defaultMessage[0]))
        message = error.response.data.errors[0].defaultMessage;
    else if (error.response && error.response.data.message && isValidMessage(error.response.data.message[0]))
        message = error.response.data.message;
    else if (error.response && error.response.status === 403)
        message = "Доступ запрещён";
    else if (error.response && error.response.status === 401)
        message = "Требуется авторизация";
    else
        message = "Произошла ошибка";

    store.addNotification({
        title: 'Ошибка',
        message: message,
        type: "danger",
        container: "top-right",
        dismiss: { duration: 2000, onScreen: true }
    });

    if (error.response && error.response.status === 401){
        localStorage.clear();
        window.location.reload();
    }

    return Promise.reject(error);
})
