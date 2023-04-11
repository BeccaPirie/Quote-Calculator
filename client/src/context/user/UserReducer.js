const UserReducer = (state, action) => {
    switch (action.type) {
            case "LOGIN_SUCCESS":
            return {
                user: action.payload
            }

            case "LOGOUT":
            return {
                user: null
            }

            case "UPDATE_USER":
            return {
                user: action.payload
            }

            default:
            return state
    }
}

export default UserReducer