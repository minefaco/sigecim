module.exports = (req, res, next) => {
    // Si existe la sesión del usuario, lo dejamos pasar
    if (req.session.usuarioId) {
        return next();
    }
    // Si no, lo mandamos al login
    res.redirect('/');
};