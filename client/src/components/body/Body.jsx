import React from 'react';
import "./body.css";
import AnimalsList from '../animalsList/animalsList.jsx';
import AddAnimal from '../addAnimal/addAnimal';

export default function Body() {
  return (
    <div className='body-container'>
      <h2 id='title'>Gestion de animales</h2>
      <AddAnimal/>
      <AnimalsList/>
    </div>
  )
}
