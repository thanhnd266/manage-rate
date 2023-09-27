export const validateEmail = (email) => {
    let re = /^(([^<>()\\,;:\s@"]+(\.[^<>().,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export const validatePhone = (phone) => {
    return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(phone);
}