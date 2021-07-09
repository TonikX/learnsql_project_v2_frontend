import {config} from "./app-config";

export default {
    getApiBasePath() {
        return 'http://62.109.28.95:8001'
        return `${config.apiSchema}://${config.apiHost}${config.apiPort ? ":" + config.apiPort : ""}`;
    },
};
