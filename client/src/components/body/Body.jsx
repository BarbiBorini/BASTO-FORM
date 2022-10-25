import React from 'react';
import "./body.css";
import AnimalsList from './animalsList/animalsList.jsx';
import AddAnimal from './addAnimal/addAnimal';

export default function Body() {
  return (
    <div>
      <div className='animal-gestion-head'>
        <h1>Gestion de animales</h1>
        <AddAnimal/>
      </div>
      <AnimalsList/>
    </div>
  )
}
