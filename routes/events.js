
//Obtener eventos

/*
    Rutas de eventos / events
    localhost + /api/events
    */
    const { Router } = require("express");
    const { check } = require("express-validator");
    const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
    const {isDate} = require("../helpers/isDate");
    const { validateJwt } = require("./middlewares/validate-Jwt");
    const { validateFields } = require("./middlewares/validateFields");
   
    
    
    const router = Router();
    
    router.use(validateJwt);


    router.post('/',
    
        [


            check('title','The title is mandatory').not().isEmpty(),
            check('start','Start date is mandatory').custom(isDate),
            check('end','End date is mandatory.').custom(isDate),
            validateFields
        ],

     createEvent
     
    );


    router.get('/', getEvents );

    
    router.put('/:id',updateEvent);


    router.delete('/:id',deleteEvent);
    
    
    module.exports = router;