const loginButtons = req => {

    const loggedIn = [
        {
            class: 'logout',
            title: 'Logout'
        }
    ];
    const loggedOut = [
        {
            class: 'signup',
            title: 'Signup'
        },
        {
            class: 'login',
            title: 'Login'
        }
    ];
    return req.headers.cookie !== undefined && req.headers.cookie.includes('jwt') ? loggedIn : loggedOut;
    
}

module.exports = loginButtons;