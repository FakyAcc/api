

export const hidePassword = (userObject) => {
    userObject.password = undefined;
    return userObject;
}