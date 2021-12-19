const mongoose = require ("../bin/mongodb");
const errorMessage = require ("../util/errorMessage");
const validators = require("../util/validators");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({

    nombre:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    apellido:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    telefono:{
        type:String,
        validate:{
            validator:function(v){
                return validators.phoneValidate(v);
            },
            message: errorMessage.USERSWEB.telefonoInvalido
        }
    },

    email:{
        type:String,
        unique:true,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator:function(v){
                return validators.emailValidate(v);
            },
            message: errorMessage.USERSWEB.userExist
        }
    },

    password:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator:function(v){
                return validators.isGoodPassword(v);
            },
            message: errorMessage.USERSWEB.passwordIncorrect
        }
    },

    

 })

 // funcion pre se ejecuta antes de guardar el documento
 userSchema.pre("save",function(next){   
    this.password = bcrypt.hashSync(this.password,10);
    next();
 })

module.exports = mongoose.model("usuarios", userSchema); // mongoose.model ( nombreColleccion, Schema)
