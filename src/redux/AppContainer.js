import * as allActionCreators from './action';
import { connect } from 'react-redux';
import App from '../App';

const mapDispatchToProps = {
    ...allActionCreators
}

const mapStateToProps = (state) => {
    return {
        usrList: state.userList,
        selectedUserId:state.selectedUserId,
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer