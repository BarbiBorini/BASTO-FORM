const Animal = require('../models/animalModel');

const animalCtrl = {
    add: async (req, res) => {
        try {
            const {ID_senasa, type, weight, paddock_name, device_type, device_num} = req.body

            if(!ID_senasa || !type || !paddock_name || !device_type  || !device_num )
                return res.status(400).json({msg: "Por favor complete los datos."})

            if(ID_senasa.length !== 16)
                return res.status(400).json({msg: "El ID de Senasa debe contener 16 digitos."})
            
            if(device_num.length !== 8)
                return res.status(400).json({msg: "El numero de dispositivo debe contener 8 digitos."})

            const newAnimal = new Animal({
                ID_senasa, type, weight, paddock_name, device_type, device_num
            })

            await newAnimal.save()

            res.json({msg: "Animal añadido con exito"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAnimalInfo: async (req, res) => { 
        try {
            const animal = await Animal.findById({_id: req.params.id})

            res.json(animal)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getAllAnimals: async (req, res) => {
        try {
            const animals = await Animal.find()

            res.json(animals)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateAnimal: async (req, res) => { 
        try {
            const { ID_senasa, type, weight, paddock_name, device_type, device_num } = req.body
            await Animal.findOneAndUpdate({_id: req.params.id}, {
                ID_senasa, type, weight, paddock_name, device_type, device_num
            })
            res.json({msg: "Datos actualizados con exito."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteAnimal: async (req, res) => {
        try {
            await Animal.findByIdAndDelete(req.params.id)
            res.json({msg: "Animal borrado con exito."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
};

module.exports = animalCtrl;