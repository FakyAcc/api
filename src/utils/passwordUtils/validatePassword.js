export const validatePassword = (password) => {
    if(password.length >= 8)
        return true;
    return false;
}