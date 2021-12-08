const STORAGE_ITEM = 'sql-learn-user';
const STORAGE_ITEM_REFRESH_TOKEN = 'sql-learn-user-refresh';

let userServiceInstance = null;

export default class UserService {
    static factory() {
        if (userServiceInstance === null) {
            userServiceInstance = new UserService();
        }

        return userServiceInstance;
    }

    setToken(token) {
        localStorage.setItem(STORAGE_ITEM, JSON.stringify(token));
    }

    setRefreshToken(token) {
        localStorage.setItem(STORAGE_ITEM_REFRESH_TOKEN, JSON.stringify(token));
    }

    getToken() {
        if (!localStorage.getItem(STORAGE_ITEM)) return null;

        return localStorage.getItem(STORAGE_ITEM).replace('"', '').replace('"', '');
    }

    getRefreshToken() {
        if (!localStorage.getItem(STORAGE_ITEM_REFRESH_TOKEN)) return null;

        return localStorage.getItem(STORAGE_ITEM_REFRESH_TOKEN).replace('"', '').replace('"', '');
    }

    logout() {
        localStorage.removeItem(STORAGE_ITEM);
        localStorage.removeItem(STORAGE_ITEM_REFRESH_TOKEN);
    }

    isAuth() {
        return this.getToken() !== null && this.getToken() !== undefined;
    }
}

export const service = new UserService()