import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Button } from "native-base";
import Modal from "react-native-modal";
import { ImageManipulator } from "expo";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from "../styles/GalleryStyles"; // Import your styles
import * as ReduxActions from '../redux/actions'; //Import your actions

class GalleryComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false, id: 0, image: null, resolution: null, size: null, path: null,
      title: null, createdDate: null, description: null
    };
  }

  componentDidMount() {
    this.props.getPictures(); //call our action
  }

  _selectPhoto = (item) => {
    this.setState({
      isModalVisible: true, id: item.id, image: item.image, size: item.size, resolution: item.resolution,
      path: item.path, title: item.title, createdDate: item.createdDate, description: item.description
    });
  }

  _saveData = () => {
    let picture = {
      "id": this.state.id, "image": this.state.image, "title": this.state.title, "description": this.state.description,
      "path": this.state.path, "size": this.state.size, "resolution": this.state.resolution, "createdDate": this.state.createdDate
    };
    picture['description'] = this.state.description;
    this.props.updatePicture(picture);
    this.setState({
      isModalVisible: false, id: null, image: null, size: null, resolution: null,
      path: null, title: null, createdDate: null, description: null
    })
  }

  _resizeImage = async (image) => {
    let resizedImage = await ImageManipulator.manipulateAsync(
      image, [{ resize: { width: 1200 } }],
      { compress: 1, format: "jpg", base64: false });
    return resizedImage;
  }

  render() {

    if (this.props.loading) {
      return (
        <View style={styles.loader.container}>
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    else {
      return (

        <View style={styles.container}>

          <FlatGrid itemDimension={130} items={this.props.pictures} style={styles.gridView}
            renderItem={({ item, index }) => (

              <TouchableOpacity onPress={() => this._selectPhoto(item)}>
                <Image style={styles.imageContainer} source={{ uri: item.image }}></Image>
              </TouchableOpacity>
             
            )}/>

          <Modal isVisible={this.state.isModalVisible} style={styles.model.container} backdropColor={"black"} backdropOpacity={0.5}>
            
            <View style={styles.model.innerContainer}>

              <Image style={styles.model.image} source={{ uri: this.state.image }} />

              <Text style={styles.model.text}>
                Title: <Text style={styles.model.value}>{this.state.title}{"\n"}</Text>
                Size: <Text style={styles.model.value}>{this.state.size}{"\n"}</Text>
                Resolution: <Text style={styles.model.value}>{this.state.resolution}{"\n"}</Text>
                Path: <Text style={styles.model.value}>{this.state.path}{"\n"}</Text>
                CreatedDate: <Text style={styles.model.value}>{this.state.createdDate}{"\n"}</Text>
              </Text>

              <TextInput multiline blurOnSubmit={true} maxLength={200} returnKeyType="done" style={styles.model.commentText} value={this.state.description}
                onChangeText={(text) => this.setState({ description: text })} placeholder="Enter comments here" />

              <Button onPress={() => this._saveData()} block style={styles.model.saveButton}>
                <Text style={styles.model.saveText}>Save</Text>
              </Button>

            </View>

          </Modal>

        </View>
      );

    }

  }

}

// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
  return {
    loading: state.dataReducer.loading,
    pictures: state.dataReducer.pictures
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ReduxActions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(GalleryComponent);
