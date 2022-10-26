import React, {useState} from 'react';
import axios from 'axios';
import Notification from '../notification/Notification.js';
import Swal from 'sweetalert2';

function AddAnimal() {

  //Hooks
  const [ID_senasa, setID_senasa] = useState('');
  const [type, setType] = useState('');
  const [weight, setWeight] = useState('');
  const [paddock_name, setPaddock_name] = useState('');
  const [device_type, setDevice_type] = useState('');
  const [device_num, setDevice_num] = useState('');
  const [notification, setNotification] = useState({});


  const showNotification = notification => {
    setNotification(notification)
    setTimeout(() => {
      setNotification({})
    }, 5000)
  }
  

  function addAnimalSubmit(){
    
    if([ID_senasa, type, paddock_name, device_type, device_num].includes('')) {
      showNotification({
        msg: 'Por favor, complete los campos requeridos.',
        error: true
      })
      return
    }

    if(ID_senasa.length !== 16) {
      showNotification({
        msg: 'El ID Senasa debe contener 16 digitos.',
        error: true
      })
      return
    }

    if(device_num.length !== 8) {
      showNotification({
        msg: 'El número de dispositivo debe contener 8 digitos',
        error: true
      })
      return
    }

    if(paddock_name.length > 200) {
      showNotification({
        msg: 'El nombre de potrero no puede superar los 200 caracteres',
        error: true
      })
      return
    }


    const animal = {
      ID_senasa: ID_senasa,
      type: type,
      weight: weight,
      paddock_name: paddock_name,
      device_type: device_type,
      device_num: device_num
    }

    axios.post('/animals/add', animal)
    .then(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Datos actualizados.',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(()=>{
        window.location.reload();
      }, 1000)
    })
    .then(err => {console.log(err)})

  }

  const { msg } = notification

  return (
    <div className='add-animal'>
      <a href="/#add" className="btn" id='btn-add'>Nuevo animal</a>

      <div className="container-all" id="add">
        <div className="popup">

          <div className='form-head'>
            <h2>Nuevo animal</h2>
            {msg && <Notification notification={notification}/>}
          </div>

          <a href="/" className="btn-close-popup"><i className="fas fa-times"/></a>
          
          <div className='input-container'>  
          <label htmlFor='ID_senasa'>ID Senasa</label>
          <input 
          id='ID_senasa'
          type="text" 
          value={ID_senasa} 
          onChange={ (e) => {setID_senasa(e.target.value) }} 
          placeholder='Debe contener 16 digitos.' />
          </div>

          <div className='input-container'>
          <label htmlFor='type'>Tipo de animal</label>
          <select 
          id="type" 
          type="text"
          value={type}
          onChange={(e) => { setType(e.target.value) }}>
            <option disabled value="">Seleccione el tipo de animal</option>
            <option>Novillo</option>
            <option>Toro</option>
            <option>Vaquillona</option>
          </select>
          </div>

          <div className='input-container'>
          <label htmlFor='weight'>Peso (kg)</label>
          <input 
          id='weight'
          type="text" 
          value={weight} 
          onChange={(e) => { setWeight(e.target.value) }} 
          placeholder='Opcional.' />
          </div>

          <div className='input-container'>
          <label htmlFor='paddock_name'>Nombre del potrero</label>
          <input 
          id='paddock_name'
          type="text" 
          value={paddock_name}  
          onChange={(e) => { setPaddock_name(e.target.value) }} 
          placeholder='Este campo es obligatorio.' />
          </div>

          <div className='input-container'>
          <label htmlFor='device_type'>Tipo de dispositivo</label>
          <select 
          id='device_type' 
          type='text' 
          value={device_type}
          onChange={(e) => { setDevice_type(e.target.value) }}>
            <option disabled value="">Seleccione el tipo de dispositivo</option>
            <option>Novillo</option>
            <option>Toro</option>
            <option>Vaquillona</option>
          </select>
          </div>


          <div className='input-container'>
          <label htmlFor='device_num'>Numero de dispositivo</label>
          <input 
          id='device_num'
          type="text" 
          value={device_num} 
          onChange={(e) => { setDevice_num(e.target.value) }} 
          placeholder='Debe contener 8 digitos.' />
          </div>

          <button onClick={addAnimalSubmit} className='btn'>Guardar</button>

        </div>
      </div>
    </div>
  )
}

export default AddAnimal;