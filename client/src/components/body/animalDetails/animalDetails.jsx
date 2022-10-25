import React, {useState} from 'react';
import './animalDetails.css';
import axios from 'axios';


function AnimalDetails({animal}) {

  const initialState = {
    ID_senasa: '',
    type: '',
    weight: '',
    paddock_name: '',
    device_type: '',
    device_num: '',
    err: '',
    success: ''
  }

  function EditAnimal (){

    const [data, setData] = useState(initialState)
    const {ID_senasa, type, weight, paddock_name, device_type, device_num} = data

    const handleChange = e => {
      const {name, value} = e.target
      setData({...data, [name]:value, err:'', success: ''})
    }

    const updateInfor = () => {
      try {
        axios.patch(`/animals/update/${animal._id}`, {
          ID_senasa: ID_senasa ? ID_senasa : animal.ID_senasa,
          type: type ? type : animal.type,
          weight: weight ? weight : animal.weight,
          paddock_name: paddock_name ? paddock_name : animal.paddock_name,
          device_type: device_type ? device_type : animal.device_type,
          device_num: device_num ? device_num : animal.device_num
        })
        .then(res => {
          alert(res.data.msg)
        })
        setData({...data})
      } catch (err) {
        setData({...data})
      }
    }

    const handleUpdate = () => {
      if(ID_senasa || type || weight || paddock_name || device_type || device_num ) updateInfor()
    }

    return(
      <div>
        <a href={`/#edit/${animal._id}`} className="btn-open-popup-edit"><i className="fa-solid fa-pen-to-square"/></a>

        <div className="container-all" id={`edit/${animal._id}`}>
          <div className="popup">

            <h1>Editar datos</h1>

            <a href="/" className="btn-close-popup"><i className="fas fa-times"/></a>

            
              <label>ID senasa</label>
              <input type="text" name="ID_senasa"  defaultValue={animal.ID_senasa} onChange={handleChange} placeholder={animal.ID_senasa} />

              <label>Tipo de animal</label>
              <input type="text" name="type" defaultValue={animal.type} onChange={handleChange} placeholder={animal.type} />
        
              <label>Peso</label>
              <input type="text" name="weight" defaultValue={animal.weight} onChange={handleChange} placeholder={animal.weight} />

              <label>Nombre del potrero</label>
              <input type="text" name="paddock_name" defaultValue={animal.paddock_name}  onChange={handleChange} placeholder={animal.paddock_name} />

              <label>Tipo de dispositivo</label>
              <input type="text" name="device_type" defaultValue={animal.device_type} onChange={handleChange} placeholder={animal.device_type} />

              <label>Numero de dispositivo</label>
              <input type="text" name="device_num" defaultValue={animal.device_num} onChange={handleChange} placeholder={animal.device_num} />

              <button  onClick={handleUpdate} className='btn-submit'>Guardar</button>

          </div>
        </div>
      </div>
    )
  }

  const handleDelete = async (_id) => {
    try {
      if(window.confirm("Estas seguro de que quieres borrar este animal?")){
        await axios.delete(`/animals/delete/${_id}`)
        .then(res => {
          alert(res.data.msg)
          window.location.reload();
        })
      }
    } catch (err) {
      console.log(err)
    }
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
        <button onClick={() => handleDelete(animal._id)} className="btn-delete">
          <i className="fa-solid fa-trash"/>
        </button>
      </td>
    </tr>
  )
}

export default AnimalDetails;
