import React from 'react';
import "../styles/login_form.css";
import brand_logo from '../images/brand_logo.svg';
import axios from 'axios';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';
import {Link} from "react-router-dom";
import {login} from "../actions.js";


class LoginForm extends React.Component{

    state = {

    }

    login = (event) => {
        event.preventDefault();
        let post_data = {
            username: this.state.email,
            password: this.state.password,
        }
        axios.post("http://www.imageshareapi.com:80/api/login/", post_data)
        .then((response) => {
            let token = response.data.token;

            axios.get(`http://www.imageshareapi.com:80/api/user?token=${token}`)
            .then((response) => {
                let account = response.data;
                this.props.login(token, account, true);                
                let cookie = new Cookies();
                cookie.set("token", token, {path:"/"})
                
                this.props.history.push("/");
            });

        })

    }

    handle_input_change = (event) =>{
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value,
        });
    }

    render(){
        return(
            <div id="form-container">
                <form method="POST" id="login-form" onSubmit={this.login}>
                    <img src={brand_logo} alt="Brand Logo" id="form-brand-logo" />
                    
                    <div id="input-container">
                        <input type="email" id="email" name="email" placeholder="Email" onChange={this.handle_input_change}/>
                        <input type="password" name="password" id="password" placeholder="Password" onChange={this.handle_input_change}/>
                    </div>
                
                    <button type="submit" id="login-button">Log in</button>

                    <div id="signup">
                        <p>Dont have a account</p>
                        <a href="{% url 'register' %}">Sign Up</a>
                    </div>
                
                </form>
            </div>
        );
    }
}

function mapStateToProps(state, oldProps){
    return{
        
    }
}

function mapPropsToDispatch(dispatch){
    return{
        login: (token, account, auth) => dispatch(login(token, account, auth)),
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(LoginForm);