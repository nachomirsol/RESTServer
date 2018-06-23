const jwt = require('jsonwebtoken');

// ========================
// Verificar Token
// ========================
let verificaToken = (req, res, next) => {

    let token = req.get('token');

    // Ahora verificaremos el token
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.user = decoded.user
        next();

    });

}
    // ========================
    // Verificar Admin Rol
    // ========================

let verificaRole = (req, res, next) => {

    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {

        next();

    } else {

        return res.json({
            ok: false,
            err: {
                message: 'User should have admin credentials'
            }
        });

    }

}
/*
    Con los middlewares se ejecuta la función, pero si no incluimos el next
    la función para cuando se ejecuta el primer callback, si lo incluimos ejecuta todo,
    aunque sólo muestre lo último    
*/


module.exports = {
    verificaToken,
    verificaRole
}