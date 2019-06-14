import React, { Component } from 'react';
import { AsyncStorage } from "react-native";
import GalleryComponent from './GalleryComponent' //Import the gallery file
import Data from '../helpers/JSON/Pictures.json'; // Import the sample data
import {connect} from 'react-redux';
import { getPictures } from '../redux/actions';
import urlPaths from '../helpers/AppConfiguration';
import axios from 'axios';

class MainComponent extends Component {

async componentDidMount() {

    try {
        // In order to get data from server, change localhost to IP address
        const response =  await axios.get(urlPaths.galleryList);
       
      } catch (error) {
        console.log(error)
      }
    
    var _this = this;

    //Check if any data exist
    AsyncStorage.getItem('data', (err, data) => {
        //if it doesn't exist, extract from json file
        //save the initial data in Async
        if (data === null){
            
              AsyncStorage.setItem('data', JSON.stringify(Data.pictures));
              _this.props.getPictures();
        }
        
    });
}

    render() {
        return (
                <GalleryComponent />
        );
    }
}

//Connect everything
export default connect(null, { getPictures })(MainComponent);
