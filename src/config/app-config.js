export function getEnvVariable(variableName, defaultValue = undefined) {
    if (typeof process.env === "object" && process.env.hasOwnProperty(variableName) && process.env[variableName] !== "" && process.env[variableName] !== null) {
        return process.env[variableName];
    }

    return defaultValue;
}

export const config = {
    apiHost: getEnvVariable("REACT_APP_API_HOST", window.location.hostname),
    apiSchema: getEnvVariable("REACT_APP_API_SCHEMA", window.location.protocol.substring(0, window.location.protocol.length - 1)),
    apiPort: getEnvVariable("REACT_APP_API_PORT", window.location.port),
    clientId: "RdseeDOjoi0BqP130DjBR1d84cGd7ZVs5rCQyjYo",
    clientSecret: "v9AxhQhn6ciPbRbZ2QYwewG6q9JAgtHQqnRHZNYBOEHM1HtbbvxZjNACnf0ODU2tMqk0zYyVfNDpQFvCSbpM8Z1w5zT6vW9BMXS5ey9lE4v2EzJb7OzKTVTjxQglmACY",
};

export default config;


