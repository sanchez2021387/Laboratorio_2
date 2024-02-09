const {Schema, model} = require('mongoose');
const MascotasSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El Nombre Es Obligatorio']
    },
    raza:{
        type: String,
        required: [true, 'La Raza Es Obligatoria']
    },
    sexo:{
        type: String,
        required: [true, 'El Sexo Es Obligatorio']
    },
    edad:{
        type: String,
        required: [true, 'La Edad Es Obligatoria']
    },
    estado:{
        type: Boolean,
        default:true
    }

});

module.exports = model('Mascota', MascotasSchema);