/*
    Rutas de Usuarios / Auth
    localhost + /api/auth
    */
const { Router } = require("express");
const { check  } = require("express-validator");
const { createUser, loginUser, revalidateToken } = require("../controllers/auth");
const { validateJwt } = require("./middlewares/validate-Jwt");
const { validateFields } = require("./middlewares/validateFields");


const router = Router();


router.post('/new',
[
    //middlewares
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    check('password','el password debe contener 6 caracteres ').isLength({min:6}),
    validateFields


],
createUser );

router.post('/',

    [

    check('email','el email es obligatorio').isEmail(),
    check('password','el password debe contener 6 caracteres ').isLength({min:6}),
    validateFields

    ],

loginUser);

router.get('/renew',validateJwt,revalidateToken)


module.exports = router;