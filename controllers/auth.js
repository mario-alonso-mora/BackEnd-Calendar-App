const {response} = require('express');
const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const { generateJsonWebToken } = require('../helpers/jwt');






const createUser = async(request,resp = response ) =>{

    const {email,password} = request.body;

    try {

        let user = await Users.findOne({email})

        if(user){

          return resp.status(400).json({
                ok:false,
                msg:'this email is already in use'
            })

        }
        
         user = new Users(request.body);

         //Encriptar contraseña

         const salt = bcrypt.genSaltSync();

         user.password = bcrypt.hashSync(password,salt);

        await user.save();
        //Generar JWT (Json web token)
       const token = await generateJsonWebToken(user.id,user.name);

       return resp.status(201).json({

            ok:true,
            uid:user.id,
            name:user.name,
            token
        
        })

    } catch (error) {

        console.log(error)

       return resp.status(500).json({

            ok:false,
            msg:'Please talk with the admin'

        }) 
    }

};

const loginUser = async (request,resp = response ) =>{

    const {email,password} = request.body;

    try {

       
        const user = await Users.findOne({email})

        if(!user){

           return resp.status(400).json({
                ok:false,
                msg:'this user dont exists with this email '
            });

        }

        //Confirmar las contraseñas
        const validPassword = bcrypt.compareSync(password,user.password);

        if (!validPassword) {

            return resp.status(400).json({

                    ok:false,
                    msg:'Password incorrect'

            });
            
        }

        //Generar nuestro JWT (Json web token)
        const token = await generateJsonWebToken(user.id,user.name);

       return resp.status(200).json({

            ok:true,
            uid:user.id,
            name:user.name,
            token

            
        });

    


        
    } catch (error) {

        console.log(error)

       return resp.status(500).json({

            ok:false,
            msg:'Please talk with the admin'

        })
        
    }
  

    
};


const revalidateToken = async(request,resp = response ) =>{

    //   const uid = request.uid;
    //   const name = request.name;

    const {uid,name} = request;
    const token = await generateJsonWebToken(uid,name);

   return resp.status(200).json({

        ok:true,
        name,
        uid,
        token,
        
        
    });

};




module.exports = {

    createUser,
    loginUser,
    revalidateToken,

}