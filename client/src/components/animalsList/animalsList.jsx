import React, {useState, useEffect} from 'react';
import AnimalDetails from '../animalDetails/animalDetails.jsx';
import axios from 'axios';


function AnimalsList() {

  const [animalsData, setAnimalsData] = useState([])
  
  // Gets all animals info
  useEffect(() => {
    axios.get('animals')
    .then(res => {
      setAnimalsData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])


  // Mapping list of animals
  const animalsList = animalsData.map(animal => {
    return(
      <AnimalDetails animal={animal} key={animal._id}/>
    )
  })



  return (
    <div className='table-container'>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID senasa</th>
            <th>Tipo de animal</th>
            <th>Peso</th>
            <th>Nombre del potrero</th>
            <th>Tipo de dispositivo</th>
            <th>Numero de dispositivo</th>
            <th>Editar o eliminar</th>
          </tr>
        </thead>
        <tbody>
          {animalsList}
        </tbody>
      </table>
    </div>
  )
}

export default AnimalsList;