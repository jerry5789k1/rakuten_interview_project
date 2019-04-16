import React, { Component } from 'react';
import './App.scss';
import UserDataTable from './container/UserDataTable';
import Form from './container/Form';


class App extends Component {
  state = {
    showForm: false,
  }

  openForm = () => {
    this.setState({
      showForm:true,
    })
  }
  closeForm = () => {
    this.setState({
      showForm:false,
    })
  }

  render() {
    const { showForm } = this.state
    return (
      <div className="container">
         <UserDataTable openForm={this.openForm}/>
         {showForm ? <Form closeForm={this.closeForm}/> : null}
      </div>
    );
  }
}

export default App;
