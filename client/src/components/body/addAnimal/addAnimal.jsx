import React, {useState} from 'react';
import "./addAnimal.css";
import axios from 'axios';

function AddAnimal() {

  //Hooks
  const [ID_senasa, setID_senasa] = useState('');
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [paddock_name, setPaddock_name] = useState('');
  const [device_type, setDevice_type] = useState('');
  const [device_num, setDevice_num] = useState('');

  const animalTypes = ['Vaquillona', 'Toro', 'Novillo']
  const deviceTypes = ['Collar', 'Caravana']
  

  function addAnimalSubmit(){
    const animal = {
      ID_senasa: ID_senasa,
      type: type,
      weight: weight,
      paddock_name: paddock_name,
      device_type: device_type,
      device_num: device_num
    }
    console.log(animal)

    axios.post('/animals/add', animal)
    .then(res => {
      alert(res.data.msg)
    })
    .then(err => {
      console.log(err)
    })
  }

  return (
    <div className='add-animal'>
      <a href="/#add" className="btn-open-popup">Nuevo animal</a>


      <div className="container-all" id="add">
        <div className="popup">

          <h2>Nuevo animal</h2>

          <a href="/" className="btn-close-popup"><i className="fas fa-times"/></a>
          
            
          <label>ID senasa</label>
          <input type="text" value={ID_senasa} onChange={ (e) => {setID_senasa(e.target.value) }} placeholder='ID senasa.' />

          <label>Tipo de animal</label>
          <select name="type" defaultValue="select" onChange={(e) => { setType(e.target.value) }}>
            <option disabled selected defaultValue="selected">Seleccionar tipo de animal</option>
            {animalTypes.map(type => {
              return(
                <option key={type} name="type" value={type}>{type}</option>
              )
            })}
          </select>
        
          <label>Peso</label>
          <input type="text" value={weight} onChange={(e) => { setWeight(e.target.value) }} placeholder='kg' />

          <label>Nombre del potrero</label>
          <input type="text" value={paddock_name}  onChange={(e) => { setPaddock_name(e.target.value) }} placeholder='Nombre del portreto' />

          <label>Tipo de dispositivo</label>
          <select name="deviceType" defaultValue="select" onChange={(e) => { setDevice_type(e.target.value) }}>
            <option disabled selected defaultValue="selected">Seleccionar tipo de dispositivo</option>
            {deviceTypes.map(type => {
              return(
                <option key={type} name="type" value={type}>{type}</option>
              )
            })}
          </select>

          <label>Numero de dispositivo</label>
          <input type="text" value={device_num} onChange={(e) => { setDevice_num(e.target.value) }} placeholder='Numero de dispositivo.' />

          <button onClick={addAnimalSubmit} className='btn-submit'>Guardar</button>

        </div>
      </div>
    </div>
  )
}

export default AddAnimal;