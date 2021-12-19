const usersModel = require("../models/usersModel")
const errorMessage = require ("../util/errorMessage");

const jwt = require("jsonwebtoken");
const bcrypt = require ("bcrypt");


module.exports={

    getAll: async function(req, res, next)
    {
        try{

            const documents = await usersModel.find();
            res.json(documents);

        }catch(e){
            
            console.log(e);

        }
        
    },

    create: async function(req, res, next)
    {
        try{

            const user = new usersModel ({
                nombre: req.body.nombre,
                apellido:req.body.apellido,
                telefono:req.body.telefono,
                email:req.body.email,
                password:req.body.password
            })
     
            const document = await user.save();

            res.json(document); // para chequear en postman

        }catch(e){
            
            console.log(e);

            if(e.message){
                res.status(500).json({status:"error", mensaje: e.message});
                return;
            }
            
            next(e); 
        }

    },

    login: async function(req, res, next)
    {
        try{
      
            const user = await usersModel.findOne({email:req.body.email});
            if(!user){
                res.json({error:true, message:"Email Incorrecto"});
                return;
            }

            if(bcrypt.compareSync(req.body.password,user.password))
            {
                const token = jwt.sign({userId:user._id}, req.app.get("secretKey"), {expiresIn:"1h"}  );  //sign({datosAsociados}, claveEncriptacion, {tiempoExpiracion,...})
                res.json({ error:false , message:"Login Ok", token:token });
                return;
            }
            else
            {
                res.json({ error:true , message:"Contraseña incorrecta" });
                return;
            }

        }catch(e){
            
            console.log(e);

            if(e.message){
                res.status(500).json({status:"error", mensaje: e.message});
                return;
            }
            
            next(e); 
        }

    }
   
}