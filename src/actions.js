
function login(token, account, auth){
    return{
        type: "login",
        account: account,
        token: token,
        auth: auth
    }
}

let logout = {
    type: "logout"
}


export {login, logout}