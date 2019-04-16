
const initState = { userList:[],selectedUserId:null }
const Reducer = (state=initState, action) => {
    switch(action.type){
        case 'CREATE':
         return { ...state, userList:[...state.userList,action.data]}
        case 'EDIT':
         return { ...state, selectedUserId:action.data}
        case 'UPDATE':
         return { ...state, userList:[...action.data]}
        case 'RESET':
         return { ...state, selectedUserId:null}
        case 'DELETE':
         return { ...state, userList:[...action.data]}
        default:
         return state;
    }
}

export default Reducer