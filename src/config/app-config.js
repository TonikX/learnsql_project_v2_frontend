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
};

export default config;


