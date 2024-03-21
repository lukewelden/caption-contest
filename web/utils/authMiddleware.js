module.exports.isAuthenticated = (req, res, next) => {
    console.log('Checking if user is authenticated');
    if (req.isAuthenticated()) {
        console.log('User is authenticated');
        return next();
    }
    console.log('User is not authenticated');
    res.redirect('/auth/login');
}