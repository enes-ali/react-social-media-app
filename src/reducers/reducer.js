import Cookies from 'universal-cookie';

let cookie = new Cookies();
let token = cookie.get("token");

let data = {
    "token": token,
    account: null,
    is_authenticated: false
};


function main_reducer(state=data, action){

    if(action.type === "login"){
        return{
            ...state,
            token: action.token, 
            account: action.account,
            is_authenticated: action.auth
        }
    }
    
    if(action.type === "logout"){
        return{
            ...state,
            token: undefined,
            account: undefined, 
            is_authenticated: undefined,
        }
    }

    return state;
}


export default main_reducer;


