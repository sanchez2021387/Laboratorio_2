const {response, json} = require('express');
const bcryptjs = require('bcryptjs');
const Mascota = require('../models/mascota');

const mascotaGet = async (req, res = response) =>{
    const {limite, desde} = req.query;
    const query = {estado : true};

    const [total, mascotas]= await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        mascotas
    });
}

const getMascotaById = async (req, res) =>{
    const {id}= req.params;
    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        mascota
    });
}

const mascotaPut = async (req, res) =>{
    const {id}= req.params;
    const {_id, sexo, ...resto}= req.body;

    await Mascota.findByIdAndUpdate(id, resto);

    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        msg: 'Mascota Actualiada exitosamente',
        mascota
    })
}

const mascotaDelete = async (req, res) =>{
    const {id}= req.params;
    await Mascota.findByIdAndUpdate(id, {estado: false});
    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        msg: 'Mascota Eliminado exitosamente',
        mascota
    });
}
const mascotaPost = async (req, res) =>{
    const {nombre, raza,edad, sexo}= req.body;
    const  mascota = new Mascota({nombre, raza,edad, sexo});

    await mascota.save();
    res.status(200).json({
        mascota
    });

}

module.exports ={
    mascotaDelete,
    mascotaPost,
    mascotaPut,
    getMascotaById,
    mascotaGet,
}