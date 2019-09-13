import React from 'react'
import { View, Text, Button, Alert, ImageBackground, Image, StyleSheet, Easing } from 'react-native';
import ZoomImage from 'react-native-zoom-image';

export default class Detailnew extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      OwnerName: this.props.navigation.getParam('OwnerName',),
      ImageURL: this.props.navigation.getParam('ImageURL'),
      ComplaintDetail: this.props.navigation.getParam('ComplaintDetail')
      
    };
    console.log("OwnerName: " + this.props.navigation.getParam('OwnerName'));
  }
  static navigationOptions = {
    title: 'Detail',
  };

  render() {
    const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = style;
    return (
      <View>
        <ImageBackground source={require("../image/bg.png")} resizeMode="stretch" style={{ width: "100%", height: "100%" }}>
          <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Image source={{ uri: this.state.ImageURL }} style={{ width: "90%", height: 180, margin: 20 }}></Image>
            {/* <ZoomImage source={{ uri: this.state.ImageURL }} style={{ width: "90%", height: 180, margin: 20 }}
              duration={200}
              enableScaling={false}
              easingFunc={Easing.ease}>
            </ZoomImage> */}
            <View style={{ backgroundColor: "white" ,margin:20}}>
              <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular" }}>{this.state.OwnerName}</Text>
              <Text style={{ color: "#000000AA", marginBottom: 10, fontFamily: "Prompt-Regular" }}>{this.state.ComplaintDetail}</Text>
            </View>
          </View>
          {/* <View style={{ flexDirection: "column", margin: 5 }}>
              <View style={titleSubtitleSytle}>
                <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular" }}>{this.state.OwnerName}</Text>
                <Text style={{ color: "#000000AA", marginBottom: 10, fontFamily: "Prompt-Regular" }}>{this.state.ComplaintDetail}</Text>
              </View>
            </View> */}
          {/* <Text>{this.state.id} </Text> */}
          <Button title="Delete Record" onPress={() => Alert.alert(this.state.OwnerName)}></Button>
          {/* <Button title="Back" onPress={()=> {this.props.navigation.navigate('Screen2')}}></Button> */}
        </ImageBackground>
      </View>
    );
  }
}
const style = StyleSheet.create(
  {
    cardStyle: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "white",
      marginBottom: 20,
      borderRadius: 10,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      }, shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,
    },
    avatarStyle: {
      width: 45,
      height: 45,
      borderRadius: (45 / 2)
    },
    titleSubtitleSytle: {
      flexDirection: "column",
      marginLeft: 16
    },
    imageItem: {
      width: "100%",
      height: 150,
      resizeMode: 'stretch',
      margin: 20,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textClick: {
      fontFamily: "Prompt-Bold",
      fontSize: 13,
      color: "#1D9D9E",
      marginTop: 10,
      textAlign: "center"
    },
    textHeader: {
      color: "black",
      fontSize: 20,
      paddingLeft: 20,
      marginBottom: 10,
      fontFamily: "Prompt-Bold"
    }
  })
