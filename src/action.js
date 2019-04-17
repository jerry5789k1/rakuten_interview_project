export const createUserData = (userData) => {
    return {
        type:'CREATE',
        payload:userData,
    }
}

export const editUserData = (userData) => {
    return {
        type:'EDIT',
        payload:userData,
    }
}
export const updateUserData = (userData) => {
    return {
        type:'UPDATE',
        payload:userData,
    }
}

export const deleteUserData = (userIdToDelete,prevUserList) => {
    const newUserList = prevUserList.filter((user)=>user.name !== userIdToDelete)
    return {
        type:'DELETE',
        payload:newUserList,
    }
}

export const resetSelectedUserId = () => {
    return {
        type:'RESET',
    }
}
