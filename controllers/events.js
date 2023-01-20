
const {response ,request} = require('express');
const Event = require('../models/Event');

//Crear nuevo evento
const createEvent = async (req = request,resp = response ) =>{

   

   const event = new Event(req.body);


    try {

        event.user = req.uid;

      const eventSave = await  event.save();


        return resp.status(201).json({

            ok:true,
            event:eventSave

        })

        
    } catch (error) {

        console.log(error);

        return resp.status(500).json({


            ok:false,
            msg:'Please talk with the admin'

        });
        
    }

   

};

//Obtener Eventos
const getEvents = async (request,resp = response ) =>{


        const events = await Event.find().populate("user","name");
        

       return resp.status(201).json({

            ok:true,
            events
            
        
        });

};


// Actualizar Evento
const updateEvent = async(req = request,resp = response ) =>{


    const eventId = req.params.id;
    const uid = req.uid;


    try {

        const event = await Event.findById(eventId);

        if (!event) {
            
            return resp.status(404).json({

                ok: false,
                msg:'The event does not exist for this Id'
            });
        }

        if (event.user.toString() !== uid) {

            return resp.status(401).json({

                ok:false,
                msg:'You do not have privileges to edit this event'

            })
            
        }


        const newEvent = {

            ...req.body,
            user:uid

        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId,newEvent,{new:true});

        resp.json({

            ok:true,

            event:eventUpdated
        });

        
    } catch (error) {

        console.log(error)

        return resp.status(500).json({

            ok:false,
            msg:'Talk to an administrator'

        })
        
    }
    

};

//Borrar evento 
const deleteEvent = async(req = request,resp = response ) =>{

    
    
    const eventId = req.params.id;
    const uid = req.uid;


    try {

        const event = await Event.findById(eventId);

        if (!event) {
            
            return resp.status(404).json({

                ok: false,
                msg:'The event does not exist for this Id'
            });
        }

        if (event.user.toString() !== uid) {

            return resp.status(401).json({

                ok:false,
                msg:'You do not have privileges to delete this event'

            })
            
        }


        const eventDeleted = await Event.findByIdAndDelete(eventId);

            return resp.json({

            ok:true,
            msg :'The event has been successfully deleted',
            event:eventDeleted
        });

        
    } catch (error) {

        console.log(error)

        return resp.status(500).json({

            ok:false,
            msg:'Talk to an administrator'

        })
        
    }


};




module.exports = {

    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
    

}