const GalleryStyles = {

  loader: {
    container: {
      backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }
  },
  container: {
    flex: 1
  },
  gridView: {
    marginTop: '10%',
    alignSelf: 'center',
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    resizeMode: "stretch",
    padding: 10,
    width: 150,
    height: 150,
  },
  model: {
    container: {
      padding: 22,
      borderRadius: 4
    },
    innerContainer: {
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
      width: '95%',
      borderRadius: 10,
      paddingBottom: '10%'
    },
    image: {
      resizeMode: "contain",
      width: responsiveFontSize * 12,
      height: responsiveFontSize * 12,
      alignSelf: "center"
    },
    text: {
      textAlign: "left",
      fontWeight: "bold",
      lineHeight: responsiveFontSize + 10,
      paddingHorizontal: 10,
      fontSize: responsiveFontSize,
      width: "90%"
    },
    value: {
      fontWeight: '100'
    },
    commentText: {
      fontSize: responsiveFontSize,
      width: "85%",
      justifyContent: "flex-start",
      textAlignVertical: "top",
      height: 65,
      marginTop: "3%",
      padding: 5,
      marginBottom: '10%',
      borderWidth: 1,
      borderRadius: 9,
      borderColor: "#ddd",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 1
    },
    saveButton: {
      borderColor: "#8BC63E",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      backgroundColor: "#0c7697",
      borderRadius: 10,
      marginHorizontal: "5%",
      height: 50
    },
    saveText: {
      color: "white",
      fontWeight: "bold"
    }
    
  }

}

export default GalleryStyles;
