export const getIsEmailError = (email) => {
    return email.length > 0 && !validateEmail(email);
}

const validateEmail = (email) => {
    // eslint-disable-next-line
    const emailPattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
}

export const getIsPasswordError = (password, passwordRepeat) => {
    return password.length > 0 && passwordRepeat.length > 0 && password !== passwordRepeat;
};
