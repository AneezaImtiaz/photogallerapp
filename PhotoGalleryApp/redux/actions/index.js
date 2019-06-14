import {AsyncStorage} from "react-native";

export const PICTURES_AVAILABLE = 'PICTURES_AVAILABLE';
export const ADD_PICTURE = 'ADD_PICTURE';
export const UPDATE_PICTURE = 'UPDATE_PICTURE';
export const DELETE_PICTURE = 'DELETE_PICTURE';

// Add Picture - CREATE (C)
export function addPicture(picture){

    return (dispatch) => {

        AsyncStorage.getItem('data', (err, pictures) => {
            if (pictures !== null){
                pictures = JSON.parse(pictures);
                pictures.unshift(picture); //add the new picture to the top
                AsyncStorage.setItem('data', JSON.stringify(pictures), () => {
                    dispatch({type: ADD_PICTURE, picture:picture});
                });
            }

        });
    };
}

// Get Pictures Data - READ (R)
export function getPictures(){

    return (dispatch) => {

        AsyncStorage.getItem('data', (err, pictures) => {
            if (pictures !== null){
                dispatch({type: PICTURES_AVAILABLE, pictures:JSON.parse(pictures)});
            }
        });

    };
}

// Update Picture - UPDATE (U)
export function updatePicture(picture){

    return (dispatch) => {

        AsyncStorage.getItem('data', (err, pictures) => {
            if (pictures !== null){
                pictures = JSON.parse(pictures);
                var index = getIndex(pictures, picture.id); //find the index of the picture with the id passed
                if (index !== -1) {
                    pictures[index]['description'] = picture.description;
                }
                AsyncStorage.setItem('data', JSON.stringify(pictures), () => {
                    dispatch({type: UPDATE_PICTURE, picture:picture});
                });
            }

        });
    };
}

// Delete Picture - DELETE (D)
export function deletePicture(id){

    return (dispatch) => {

        AsyncStorage.getItem('data', (err, pictures) => {
            if (pictures !== null){
                pictures = JSON.parse(pictures);
                var index = getIndex(pictures, id); //find the index of the picture with the id passed
                if(index !== -1) pictures.splice(index, 1);//if yes, undo, remove the PICTURE
                AsyncStorage.setItem('data', JSON.stringify(pictures), () => {
                    dispatch({type: DELETE_PICTURE, id:id});
                });
            }
            
        });
    };
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}