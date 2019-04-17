import { connect } from 'react-redux';
import {editUserData,deleteUserData} from '../../action';
import UserDataColumn from '../../component/UserDataColumn'
const mapStateToProps = (state) => {
    return {
        userList: state.userList
    }
}
export default connect(mapStateToProps,{editUserData,deleteUserData})(UserDataColumn);
