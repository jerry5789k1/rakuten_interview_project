
const initState = { userList:[],selectedUserId:null }
const Reducer = (state=initState, action) => {
    switch(action.type){
        case 'CREATE':
         return { ...state, userList:[...state.userList,action.payload]}
        case 'EDIT':
         return { ...state, selectedUserId:action.payload}
        case 'UPDATE':
         return { ...state, userList:action.payload}
        case 'RESET':
         return { ...state, selectedUserId:null}
        case 'DELETE':
         return { ...state, userList:action.payload}
        default:
         return state;
    }
}

export default Reducer