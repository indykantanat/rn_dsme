import React from 'react'
import { View, Text, ImageBackground, Image, Button, PermissionsAndroid } from 'react-native';

class MainActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
      try {PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    } catch (err) {
      console.warn(err);
    }
   
  }
  render() {
    return (
      <View>
        <ImageBackground source={require("../image/bgmain.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
          <Image source={require("../image/home.png")} style={{ width: 200, height: 200, marginTop: 50 }}></Image>
          <Button title="Go to Test1" onPress={() =>{this.props.navigation.navigate("Setting")}}></Button>
        </ImageBackground>
      </View>
    );
  }
}

export default MainActivity;
