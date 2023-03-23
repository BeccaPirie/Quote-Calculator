export const LoginStart = () => ({
    type: "LOGIN_START",
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFail = (err) => ({
    type: "LOGIN_FAIL",
    payload: err,
})

export const Logout = () => ({
    type: "LOGOUT",
    payload: null
})

export const UpdateUser = (user) => ({
    type: "UPDATE_USER",
    payload: user
})

export const UpdatePassword = (password) => ({
    type: "UPDATE_PASSWORD",
    payload: password
})