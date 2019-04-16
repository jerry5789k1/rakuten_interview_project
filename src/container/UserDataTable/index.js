import { connect } from 'react-redux';
import UserDataTable from '../../component/UserDataTable';
const mapStateToProps = (state) => {
    return {
        userList: state.userList
    }
}
export default connect(mapStateToProps)(UserDataTable);