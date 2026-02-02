import {config} from "./app-config";

export default {
    getApiBasePath() {
        return `${config.apiSchema}://${config.apiHost}${config.apiPort ? ":" + config.apiPort : ""}`;
    },
    getClientId() {
        return config.clientId
    },
    getClientSecret() {
        return config.clientSecret
    },
};
