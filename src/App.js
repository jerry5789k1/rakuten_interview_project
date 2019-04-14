import React, { Component } from 'react';
// scss
import './App.scss';
// component 
import DataTable from './container/DataTable/DataTable';
import Form from './container/Form/Form';


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
         <DataTable openForm={this.openForm}/>
         {showForm ? <Form closeForm={this.closeForm}/> : null}
      </div>
    );
  }
}

export default App;
