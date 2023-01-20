const { response,request} = require('express');
const {validationResult} = require('express-validator');


//!Manejo de errores

const validateFields = (req = request , resp = response , next) => {


    const errors = validationResult(req);

    if(!errors.isEmpty()){

        console.log(errors)

        return resp.status(400).json({

            ok:false,
            errors:errors.mapped(),

        })
    }


    next();

}


module.exports = {
    validateFields
}
