import React, {useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Notification from '../notification/Notification.js';


function AnimalDetails({animal}) {

  function EditAnimal (){

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

    const handleUpdate = () => {
      
      if(ID_senasa.length !== 0 && ID_senasa.length !== 16) {
        showNotification({
          msg: 'El ID Senasa debe contener 16 digitos.',
          error: true
        })
        return
      }
  
      if(device_num.length !== 0 && device_num.length !== 8) {
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

      axios.patch(`/animals/update/${animal._id}`, {
          ID_senasa: ID_senasa ? ID_senasa : animal.ID_senasa,
          type: type ? type : animal.type,
          weight: weight ? weight : animal.weight,
          paddock_name: paddock_name ? paddock_name : animal.paddock_name,
          device_type: device_type ? device_type : animal.device_type,
          device_num: device_num ? device_num : animal.device_num
      }).then(res => {
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
      }).then(err => {console.log(err)})
    }

    const { msg } = notification

    return(
      <div>
        <a href={`/#edit/${animal._id}`}  className='btn-edit'><i className="fa-solid fa-pen-to-square"/></a>

        <div className="container-all" id={`edit/${animal._id}`}>
          <div className="popup">

            <div className='form-head'>
              <h2>Editar datos</h2>
              {msg && <Notification notification={notification}/>}
            </div>

            <a href="/" className="btn-close-popup"><i className="fas fa-times"/></a>
            
            <div className='input-container'>
            <label htmlFor='ID_senasa'>ID senasa</label>
            <input 
            id='ID_senasa'
            type="text" 
            defaultValue={animal.ID_senasa}
            onChange={ (e) => {setID_senasa(e.target.value) }} 
            placeholder={animal.ID_senasa} />
            </div>
            
            <div className='input-container'>
            <label htmlFor='type'>Tipo de animal</label>
            <select 
            id="type" 
            type="text"
            value={type}
            onChange={(e) => { setType(e.target.value) }}>
              <option disabled value="">{animal.type}</option>
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
            defaultValue={animal.weight}
            onChange={(e) => { setWeight(e.target.value) }} 
            placeholder={animal.weight} />
            </div>

            <div className='input-container'>
            <label htmlFor='paddock_name'>Nombre del potrero</label>
            <input 
            id='paddock_name'
            type="text" 
            defaultValue={animal.paddock_name}
            onChange={(e) => { setPaddock_name(e.target.value) }} 
            placeholder={animal.paddock_name} />
            </div>

            <div className='input-container'>
            <label htmlFor='device_type'>Tipo de dispositivo</label>
            <select 
            id='device_type' 
            type='text' 
            value={device_type}
            onChange={(e) => { setDevice_type(e.target.value) }}>
              <option disabled value="">{animal.device_type}</option>
              <option>Collar</option>
              <option>Caravana</option>
            </select>
            </div>

            <div className='input-container'>
            <label htmlFor='device_num'>Numero de dispositivo</label>
            <input 
            id='device_num'
            type="text" 
            defaultValue={animal.device_num}
            onChange={(e) => { setDevice_num(e.target.value) }} 
            placeholder={animal.device_num} />
            </div>

            <button  onClick={handleUpdate} className='btn'>Guardar</button>

          </div>
        </div>
      </div>
    )
  }

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`/animals/delete/${_id}`)
      .then(res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Animal eliminado.',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(()=>{
          window.location.reload();
        }, 1000)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteAlert = (_id) => {
    Swal.fire({
      title: 'Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9EB938',
      cancelButtonColor: '#687371',
      confirmButtonText: 'Si, eliminar este animal',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(_id)
      }
    })
  }

  return (
    <tr className='data-container' key={animal._id}> 
      <td className='list-group-item'>{animal.ID_senasa}</td>
      <td className='list-group-item'>{animal.type}</td>
      <td className='list-group-item'>{animal.weight}</td>
      <td className='list-group-item'>{animal.paddock_name}</td>
      <td className='list-group-item'>{animal.device_type}</td>
      <td className='list-group-item'>{animal.device_num}</td>
      <td className='list-group-item' id='deleteAndEdit'>
        <EditAnimal/>
        <button onClick={() => deleteAlert(animal._id)} className="btn-delete">
          <i className="fa-solid fa-trash"/>
        </button>
      </td>
    </tr>
  )
}

export default AnimalDetails;
