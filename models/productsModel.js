const mongoose = require ("../bin/mongodb");
const errorMessage = require ("../util/errorMessage");

const pictureSchema = new mongoose.Schema({ secure_url: String });


const productSchema = new mongoose.Schema({

    title:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        minlength:[4, errorMessage.GENERAL.minlength]
    },

    price:{
        type:Number,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    description:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    warranty:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    available_quantity:{
        type:Number,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },

    pictures:{
        type: [pictureSchema],
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },
 })

module.exports = mongoose.model("productos", productSchema); // mongoose.model ( nombreColleccion, Schema)

