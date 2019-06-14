import { combineReducers } from 'redux';
import { PICTURES_AVAILABLE, ADD_PICTURE, UPDATE_PICTURE, DELETE_PICTURE } from "../actions/" //Import the actions types constant we defined in our actions

let dataState = { pictures: [], loading:true };

const dataReducer = (state = dataState, action) => {

    switch (action.type) {

        case ADD_PICTURE:{
            let pictures =  cloneObject(state.pictures) //clone the current state
            pictures.unshift(action.picture); //add the new picture to the top
            state = Object.assign({}, state, { pictures: pictures});
            return state;
        }

        case PICTURES_AVAILABLE:
            state = Object.assign({}, state, { pictures: action.pictures, loading:false });
            return state;

        case UPDATE_PICTURE:{
            let picture = action.picture;
            let pictures =  cloneObject(state.pictures) //clone the current state
            let index = getIndex(pictures, picture.id); //find the index of the picture with the picture id passed
            if (index !== -1) {
                pictures[index]['description'] = picture.description;
                pictures[index]['text'] = picture.text;
            }
            state = Object.assign({}, state, { pictures: pictures});
            return state;
        }

        case DELETE_PICTURE:{
            let pictures =  cloneObject(state.pictures) //clone the current state
            let index = getIndex(pictures, action.id); //find the index of the picture with the id passed
            if(index !== -1) pictures.splice(index, 1);//if yes, undo, remove the PICTURE
            state = Object.assign({}, state, { pictures: pictures});
            return state;
        }

        default:
            return state;
    }
};

function cloneObject(object){
    return JSON.parse(JSON.stringify(object));
}

function getIndex(data, id){
    let clone = JSON.parse(JSON.stringify(data));
    return clone.findIndex((obj) => parseInt(obj.id) === parseInt(id));
}

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
})

export default rootReducer;