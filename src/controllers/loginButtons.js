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

    // if (req.headers.cookie !== undefined && req.headers.cookie.includes('jwt')) {
    //     return loggedIn;
    // } else {
    //     return loggedOut;
    // }
    return req.headers.cookie !== undefined && req.headers.cookie.includes('jwt') ? loggedIn : loggedOut;
    
}

module.exports = loginButtons;