const productsModel = require("../models/productsModel")
const errorMessage = require ("../util/errorMessage");

module.exports={


    getAll: async function(req, res, next)
    {
        try{


            const documents = await productsModel.find();
            console.log(JSON.parse(JSON.stringify(documents)));
            res.json(documents);

        }catch(e){
            
            console.log(e);

        }
        
    },

    getDestacados: async function(req, res, next)
    {
        try{

            const documents = await productsModel.find({ destacado: true}).exec();
            res.json(documents);

        }catch(e){
            
            console.log(e);

        }
        
    },

    getById: async function(req,res, next)
    {
        try{

            const documents = await productsModel.findById(req.params.id);
            res.json(documents);

        }catch(e){
            
            console.log(e);

        }

    },

    create: async function(req, res, next)
    {
        console.log(req.body);
        try{

            const produc = new productsModel ({
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                warranty:req.body.warranty,
                available_quantity:req.body.available_quantity,
                pictures:req.body.pictures,
            })
     
            const document = await produc.save();

            res.json(document); // para chequear en postman

        }catch(e){
            
            console.log(e);
            
            //res.json({status:"error", mensaje:errorMessage.GENERAL.errorGeneral}) // error personalizado
            //res.status(500).json({status:"error", mensaje:errorMessage.GENERAL.errorGeneral}) // error con estado

            if(e.message){
                res.status(500).json({status:"error", mensaje: e.message});
                return;
            }

            next(e); //error handler centraliza el manejo de errores, sirve para errores genericos se define en el app.js
        }

    },

    update: async function(req, res, next)
    {
        try{

            const document = await productsModel.updateOne({_id:req.params.id},req.body)
            res.json("se actualizo "+document);

        }catch(e){
            
            console.log(e);

        }
    },

    ponerDestacado: async function(req, res, next)
    {
        try{

            const document = await productsModel.updateOne({ _id:req.params.id},{ $set: { destacado: true }}); 
            res.json(document);   

        }catch(e){
            
            console.log(e);

        }
    },

    quitarDestacado: async function(req, res, next)
    {
        try{

            const document = await productsModel.updateOne({ _id:req.params.id}, { $set: { destacado: false}}); 
            res.json(document);

        }catch(e){
            
            console.log(e);

        }
    },    


    delete: async function(req, res, next)
    {
        try{
            
            const document = await productsModel.deleteOne({_id:req.params.id})
            res.json(document);

        }catch(e){
            
            console.log(e);

        }
    },

    actualizarCantidad: async function(req, res, next)
    {
        try{
            
            const document = await productsModel.updateOne({ _id:req.params.id}, { $set: { available_quantity: req.body.available_quantity }}); 
            res.json(document);   

        }catch(e){
            
            console.log(e);

        }
    },
}