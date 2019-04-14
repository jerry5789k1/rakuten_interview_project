const Reducer = (state=[[],{idToEdit:undefined}], payLoad) => {
    console.log('state',state,payLoad)
    switch(payLoad.type){
        case 'CREATE':
         return [[...state[0],payLoad.data],{idToEdit:undefined}]
        case 'EDIT':
         return [[...state[0]],{idToEdit:payLoad.data}]
        case 'UPDATE':
         return [[...payLoad.data],{idToEdit:undefined}]
        case 'RESET':
         return [[...state[0]],{idToEdit:undefined}]
        case 'DELETE':
         return [[...payLoad.data],{idToEdit:undefined}]
        default:
         return state;
    }
}

export default Reducer