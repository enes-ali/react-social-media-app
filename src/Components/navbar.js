import React from "react";
import "../styles/navbar.css";
import menu_icon from "../images/menu.svg";
import brand_logo from "../images/brand_logo.svg";
import MobileNavbar from "./mobile_navbar.js"
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import {logout} from "../actions.js";
import Cookies from "universal-cookie";


class Navbar extends React.Component{

    logout = (event) => {
        let cookie = new Cookies();
        cookie.remove("token", {path: "/"});
        this.props.logout();
    } 

    get_navigation = () => {
        if(this.props.is_authenticated){
            return(
                <ul id="navbar-navigation">          
                    <li className="navigation-index"><a href="" className="navlink">Posts</a></li>
                    <li className="navigation-index"><a href="{% url 'upload_post' %}" className="navlink">Upload</a></li>
                    <li className="navigation-index" onClick={this.logout}><a className="navlink">Log out</a></li>
                    <a href=""><img id="navigation-profile-photo" src={`http://www.imageshareapi.com${this.props.account.profile_photo}`} alt="" /></a>
                 </ul>
            );
        }
        else{
            return(
                <ul id="navbar-navigation">          
                    <li className="navigation-index"><Link to="/login" className="navlink">Log In</Link></li>
                </ul>
            );
        }
    }

    open_overlay = () =>{
        this.mobileNavbar.overlayMenu.classList.remove("overlay-menu-disabled");
    }

    render(){
        return(
            <nav id="navbar">
                <div id="navbar-brand-container" className="centered">
                    <img src={brand_logo} alt="Brand Img" id="brand-logo" />
                </div>
                {this.get_navigation()}
                <img src={menu_icon} alt="Logo" id="open-overlay-menu" onClick={this.open_overlay}/>

                <MobileNavbar ref={(ref) => this.mobileNavbar = ref} account={this.props.account} 
                    is_authenticated={this.props.is_authenticated}
                    logout={this.logout}/>
            </nav>
        );
    }
}

function setStateToProps(state, oldProps){
    return{
        account: state.account,
        is_authenticated: state.is_authenticated,
    }
}

function mapPropsToDispatch(dispatch){
    return{
        logout: () => dispatch(logout),
    }
}

export default connect(setStateToProps, mapPropsToDispatch)(Navbar);