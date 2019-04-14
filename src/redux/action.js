export const createData = (data) => {
    return {
        type:'CREATE',
        data:data,
    }
}

export const editData = (data) => {
    return {
        type:'EDIT',
        data:data,
    }
}
export const updateData = (data) => {
    return {
        type:'UPDATE',
        data:data,
    }
}

export const deleteData = (data) => {
    return {
        type:'DELETE',
        data:data,
    }
}

export const resetIdToEdit = () => {
    return {
        type:'RESET',
    }
}