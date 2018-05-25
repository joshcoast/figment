var exports = module.exports = {}
 
exports.signup = (req, res) => {
    res.render('signup');
}
 
exports.signin = (req, res) => {
    res.render('signin');
}
 
exports.choice = (req, res) => {
    res.render('choice');
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
       res.redirect('/');
    });
 
}