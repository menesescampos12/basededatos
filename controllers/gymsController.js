let gymsModel = require('../models/gymsModel');
const {
    ObjectId
} = require('mongoose').Types;

module.exports = {
    getgyms: async function (req, res) {
        try {
            const gyms = await gymsModel.find({}).exec();
            console.log(gyms);
            return res.json(gyms);
        } catch (err) {
            return res.status(500).json({
                message: 'Error when getting gyms.',
                error: err
            });
        }
    },


    creategyms: async function (req, res) {
        try {
            const existinggyms = await gymsModel.findOne({
                name: req.body.name
            });

            if (existinggyms) {
                return res.status(409).json({
                    message: 'El gimnasio ya existe'
                });
            }

            const newGymData = {
                name: req.body.name,
                location: req.body.location,
                price: req.body.price,
                openTime: req.body.openTime,
                closeTime: req.body.closeTime,
                coaches: req.body.coaches // Ajusta esta línea según la estructura de tu modelo
            };

            const newGym = new gymsModel(newGymData);

            const savedgyms = await newGym.save();
            return res.status(201).json(savedgyms);
        } catch (err) {
            console.error('Error al crear gimnasio:', err);
            return res.status(500).json({
                message: 'Error al crear gimnasio.',
                error: err.message
            });
        }
    },
    removegyms: async function (req, res) {
        try {
            const {
                id
            } = req.params;

            const gyms = await gymsModel.findByIdAndDelete(id);

            if (!gyms) {
                return res.status(404).json({
                    message: 'No se encontró el gimnasio'
                });
            }
            return res.json({
                message: `Se ha eliminado con éxito el gimnasio con ID: ${id}`
            });
        } catch (err) {
            console.error('Error al eliminar el gimnasio:', err);
            return res.status(500).json({
                message: 'Error al eliminar el gimnasio.',
                error: err.message
            });
        }
    },
    updategyms: async function (req, res) {
        try {
            const {
                id
            } = req.params;
            const updateData = req.body;

            const updatedgyms = await gymsModel.findByIdAndUpdate(id, {
                $set: updateData
            }, {
                new: true
            });


            if (!updatedgyms) {
                return res.status(404).json({
                    message: 'No se encontró el gimnasio'
                });
            }

            return res.json(updatedgyms);
        } catch (err) {
            console.error('Error al actualizar el gimnasio:', err);
            return res.status(500).json({
                message: 'Error al actualizar el gimnasio.',
                error: err.message
            });
        }
    },

    searchgyms: async function (req, res) {
        try {
            const {
                id
            } = req.params;

            const gyms = await gymsModel.findById(id);

            if (!gyms) {
                return res.status(404).json({
                    message: 'No se encontró el gimnasio'
                });
            }

            return res.json(gyms);
        } catch (err) {
            console.error('Error al buscar el gimnasio:', err);
            return res.status(500).json({
                message: 'Error al buscar el gimnasio.',
                error: err.message
            });
        }
    },



    SearchgymsByEmail: async function (req, res) {
        try {
            const {
                email
            } = req.body;
            const gyms = await gymsModel.findOne({
                email
            });
            if (!gyms) {
                return res.status(404).json({
                    message: 'No se encontró el gimnasio con ese correo electrónico'
                });
            }
            return res.json(gyms);
        } catch (err) {
            console.error('Error al buscar gimnasio por correo electrónico:', err);
            return res.status(500).json({
                message: 'Error al buscar gimnasio por correo electrónico.',
                error: err.message
            });
        }
    }

}