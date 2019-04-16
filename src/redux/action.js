export const createUserData = (data) => {
    return {
        type:'CREATE',
        data:data,
    }
}

export const editUserData = (data) => {
    return {
        type:'EDIT',
        data:data,
    }
}
export const updateUserData = (data) => {
    return {
        type:'UPDATE',
        data:data,
    }
}

export const deleteUserData = (data) => {
    return {
        type:'DELETE',
        data:data,
    }
}

export const resetSelectedUserId = () => {
    return {
        type:'RESET',
    }
}
