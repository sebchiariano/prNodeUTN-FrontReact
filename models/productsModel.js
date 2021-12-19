const mongoose = require ("../bin/mongodb");
const errorMessage = require ("../util/errorMessage");

const productSchema = new mongoose.Schema({

    nombre:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        minlength:[4, errorMessage.GENERAL.minlength]
    },

    precio:{
        type:Number,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    codigo:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    descripcion:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    categoria:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    destacado:{
        type:Boolean,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

 })

module.exports = mongoose.model("productos", productSchema); // mongoose.model ( nombreColleccion, Schema)

