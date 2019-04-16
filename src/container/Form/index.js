import { connect } from 'react-redux';
import {createUserData, resetSelectedUserId, updateUserData} from '../../redux/action';
import Form from '../../component/Form';


const getSelectedUser = (state) => state.userList.find((user)=> user.name === state.selectedUserId)
const mapStateToProps = (state) => {
    return {
      selectedUser: getSelectedUser(state),
      selectedUserId:state.selectedUserId,
      userList:state.userList,
    }
}

export default connect(mapStateToProps,{createUserData, resetSelectedUserId, updateUserData})(Form);