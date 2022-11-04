import React from "react";
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from "./Components/navbar.js";
import LoginForm from './Components/login_form.js';
import axios from "axios";
import {connect} from "react-redux";
import {login} from "./actions.js"


class App extends React.Component{

  componentDidMount(){
    if(this.props.account == null && this.props.token !== undefined){
      axios.get(`http://www.imageshareapi.com/api/user?token=${this.props.token}`)
      .then((response) => {
          let account = response.data;
          this.props.login(this.props.token, account, true);
      })
    }
  }

  render(){
    return(
      <BrowserRouter>
        <Navbar />
        <Route exact path="/login" component={LoginForm}/>
        
      </BrowserRouter>
    );
  }

}

function mapStateToProps(state, oldProps){
  return{
    token: state.token,
    account: state.account,
  }
}

function mapPropsToDispatch(dispatch){
  return{
    login: (token, account, auth)=> dispatch(login(token ,account, auth)),
  }
}

export default connect(mapStateToProps, mapPropsToDispatch)(App);