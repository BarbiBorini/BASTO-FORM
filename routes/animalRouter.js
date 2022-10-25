const router = require('express').Router();
const animalCtrl = require('../controllers/animalCtrl')

router.post('/add', animalCtrl.add);
router.get('/info/:id', animalCtrl.getAnimalInfo); 
router.get('/', animalCtrl.getAllAnimals);
router.patch('/update/:id', animalCtrl.updateAnimal); 
router.delete('/delete/:id', animalCtrl.deleteAnimal); 

module.exports = router;