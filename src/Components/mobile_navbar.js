import React from 'react';
import close_overlay from '../images/close.svg';
import account_icon from "../images/account.svg";
import login_icon from "../images/login.svg";
import logout_icon from "../images/logout.svg";
import settings_icon from "../images/settings.svg";
import {Link} from 'react-router-dom';


class MobileNavbar extends React.Component{

    close_when_choose = (event) => {
        this.overlayMenu.classList.add("overlay-menu-disabled");
    }

    get_navigation = () => {
        if(this.props.is_authenticated){
            return(     
                <ul id="overlay-navigation" onClick={this.close_when_choose}>
                    <li className="overlay-navigation-index"><a href="" className="overlay-navlink"><img className="overlay-navlink-icon" src={account_icon}/> <p>Account</p></a></li>    
                    <li className="overlay-navigation-index"><a href="{% url 'upload_post' %}" className="overlay-navlink"><img className="overlay-navlink-icon" src={account_icon} /> <p>Upload</p></a></li>
                    <li className="overlay-navigation-index"><a href="" className="overlay-navlink"><img className="overlay-navlink-icon" src={settings_icon} /> <p>Settings</p></a></li>
                    <li onClick={this.props.logout} className="overlay-navigation-index"><a className="overlay-navlink"><img className="overlay-navlink-icon" src={logout_icon}/> <p>Log out</p></a></li>
                </ul>
            );
        }
        else{
            return(   
                <ul id="overlay-navigation" onClick={this.close_when_choose}>
                    <li className="overlay-navigation-index"><Link to="/login" className="overlay-navlink"><img className="overlay-navlink-icon" src={login_icon} /> <p>Login</p></Link></li>
                </ul>
            );
        }
    }

    get_header = () => {
        if(this.props.is_authenticated){
            return(
                <div id="overlay-menu-header">
                    <img src={`http://www.imageshareapi.com${this.props.account.profile_photo}`} alt="profile photo" id="overlay-menu-profile-photo"/>
                    <div id="overlay-menu-profile-info">
                        <p id="overlay-menu-profile-username">{this.props.account.username}</p>
                    </div>
                    <img src={close_overlay} alt="Close Icon" id="close-overlay-menu" onClick={this.close_overlay}/>
                </div>
            );
        }else{
            return(
                <div id="overlay-menu-header">
                    <img src={close_overlay} alt="Close Icon" id="close-overlay-menu" onClick={this.close_overlay}/>
                </div>
            );
        }
    }

    close_overlay = () =>{
        this.overlayMenu.classList.add("overlay-menu-disabled");
    }
    
    render(){
        return(
            <div className="overlay-menu  overlay-menu-disabled" ref={(ref) => this.overlayMenu = ref}>

                {this.get_header()}

                {this.get_navigation()}
        </div>
        );
    }

}

export default MobileNavbar;