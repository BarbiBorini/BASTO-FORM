import axios from 'axios';
import { GET_ANIMAL, GET_ANIMALS, DELETE_ANIMAL, UPDATE_ANIMAL} from './types';

export function getAnimals() {
    return async function(dispatch) {
        try {
            const response = await axios.get('/animals');
            return dispatch({type: GET_ANIMALS, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export function addAnimal(payload) {
    return async function() {
        try {
             await axios.post('/animals/add', payload);
        } catch (error) {
            console.log(error)
        }
    }
};

export function updateAnimal(id, payload) {
    return async function(dispatch) {
        try {
            const response = await axios.patch(`/animals/update/${id}`, payload)
            return dispatch({type: UPDATE_ANIMAL, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export function getAnimal(id) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`/animals/info/${id}`);
            return dispatch({type: GET_ANIMAL, payload: response.data})
        } catch (error) {
            console.log(error)
        }
    }
};

export function deleteAnimal(id) {
    return async function(dispatch) {
        try {
            const response = await axios.delete(`/animals/delete/${id}`);
            
            setTimeout(() => {                
                return dispatch({type: DELETE_ANIMAL, payload: response.data})
            }, 1600)

        } catch(error) {
            console.log(error)
        }
    }
}
