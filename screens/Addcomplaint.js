import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';
import {
  View,
  Text,
  AsyncStorage,
  Button,
  ImageBackground,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  Alert,
  NativeModules,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid
} from 'react-native';
var ImagePicker = NativeModules.ImageCropPicker
import axios from 'axios';
import Fetch from 'react-native-fetch'
class Addcomplaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ComplaintCategory: this.props.navigation.getParam('Id'),
      Firstname: "",
      LastName: "",
      Mobile: "",
      Email: "",
      IdCard: "",
      ComplaintDetail: "",
      GetCommunity: [],
      Community: "",
      Community2: "",
      userLocation: null,
      image: null,
      TicketOrderId: "",
      ImageUrl: ""
    };
  }
  static navigationOptions = {
    title: 'เพิ่มเรื่องร้องเรียน',
  };
  componentDidMount() {
    this.getUser();
    this.getCommunity();
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        })
        console.log("USERLOCATION: " + this.state.userLocation.latitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 60000, maximumAge: 10000 }
    );
  }
  getUser = async () => {
    try {
      var Name = await AsyncStorage.getItem('Name');
      var LastName = await AsyncStorage.getItem('LastName');
      var Mobile = await AsyncStorage.getItem('Mobile');
      var Email = await AsyncStorage.getItem('Email');
      var IdCard = await AsyncStorage.getItem('IdCard');
      this.setState({ Firstname: Name })
      this.setState({ LastName: LastName })
      this.setState({ Mobile: Mobile })
      this.setState({ Email: Email })
      this.setState({ IdCard })
      console.log("Name: " + Name);
      console.log("NameUser: " + this.state.Firstname);
    }
    catch (error) {
      alert(error)
    }
  }
  // getCommunity() {
  //   const url = "http://services.totiti.net/DSME1953Wcf/Service1.svc/";
  //   axios.get(url + "GetCommunity")
  //     .then(response => {
  //       this.setState({ GetCommunity: response.data.GetCommunityResult })
  //       Alert.alert(JSON.stringify(response.data.GetCommunityResult))
  //     })
  //     .catch(err => {
  //       alert(JSON.stringify(error));
  //     })
  // }
  getCommunity() {
    let url = 'http://services.totiti.net/DSME1953Wcf/Service1.svc/'
    axios.get(url + "GetCommunity").then(data => {
      // alert(JSON.stringify(data.data.GetCommunityResult))
      this.setState({
        GetCommunity: data.data.GetCommunityResult.map((i, index) => {
          return { value: i.Id, label: i.Name }
        })
      })
    })
  }
  _Community = (Community2) => {
    this.setState({
      Community2: Community2
    })
    // this._onRefresh()
  }
  Addcomplaint = () => {
    const url = "http://services.totiti.net/DSME1953Wcf/Service1.svc/";
    axios.post(url + "TicketOrder/Add", {
      ComplaintCategory: this.state.ComplaintCategory,
      ComplaintDetail: this.state.ComplaintDetail,
      UserId: "18",
      OwnerEmail: this.state.Email,
      OwnerIdCard: this.state.IdCard,
      OwnerName: this.state.Firstname + " " + this.state.LastName,
      OwnerPhoneNumber: this.state.Mobile,
      Lastitude: this.state.userLocation.latitude,
      Longitude: this.state.userLocation.longitude,
      Status: "1",
      Com_Id: this.state.Community2

    }).then(result => {
      // Alert.alert('เสร็จสิ้น')
      this.setState({ TicketOrderId: result.data.value });
      console.log("TicketOrderId :", this.state.TicketOrderId);
      var dateFormat = require('dateformat');
      var now = dateFormat(now, "yyyymmddHHMMss");
      console.log("dateFormat :", now);
      this.setState({ ImageUrl: this.state.TicketOrderId + "_" + now + ".jpg" });
      console.log("ImageUrl :", this.state.ImageUrl);
      const data = new FormData();
      data.append('myFile', {
        uri: this.state.image.uri,
        type: 'image/jpeg', // or photo.type
        name: this.state.TicketOrderId + "_" + now + '.jpg'
      });
      fetch("http://services.totiti.net/DSME1953Image/android_upload_image.php", {
        method: "POST",
        body: data
      }).then((resp) => {
        console.log("return :", resp);
      }).catch(err => {
        console.log("image notuploaded");
      });
      const url = "http://services.totiti.net/DSME1953Wcf/Service1.svc/";
      axios.post(url + "TicketImage/Add", {
        Id: 1,
        TicketOrder: this.state.TicketOrderId,
        ImageUrl: this.state.ImageUrl
      }).then(result => {
        console.log("result :", result);
        Alert.alert('เสร็จสิ้น')
        this.props.navigation.navigate("Listcomplain")
      })
    })
  }

  // Addimage = () => {
  //   const data = new FormData();
  //   data.append('myFile', {
  //     uri: this.state.image.uri,
  //     type: 'image/jpeg', // or photo.type
  //     name: this.state.TicketOrderId + '.jpg'
  //   });
  //   fetch("http://services.totiti.net/DSME1953Image/android_upload_image.php", {
  //     method: "POST",
  //     body: data
  //   }).then((resp) => {
  //     console.log("return :", resp);
  //   }).catch(err => {
  //     console.log("image notuploaded");
  //   });
  // }

  openCamera() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    })
  }
  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      cropperCircleOverlay: false,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      console.log("received image", image);
      this.setState({
        image: { uri: image.path }
      });
    }).catch(e => alert(e));
  }
  pickSingle(cropit, circular = false) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 400,
      compressVideoPreset: "MediumQuality",
      includeExif: true,
    }).then(image => {
      console.log("received image", image);
      this.setState({
        image: { uri: image.path }
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }
  renderImage(image) {
    return <Image style={{ width: 200, height: 200, resizeMode: "cover" }} source={image}></Image>
  }
  render() {
    return (
      <View>
        <ImageBackground source={require("../image/bg.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
          <View style={{ backgroundColor: "rgba(255,255,255,0.8)", height: "100%", width: "100%" }}>
            <ScrollView>
              <View style={{ alignItems: "center" }}>
                <TextInput style={style.textInput}>{this.state.Firstname} {this.state.LastName}</TextInput>
                <TextInput style={style.textInput}>{this.state.Mobile} </TextInput>
                <TextInput style={style.textInput}>{this.state.Email} </TextInput>
                <TextInput style={style.textInput} placeholder="รายละเอียด" placeholderTextColor="gray" keyboardType={"default"} onChangeText={(text) => this.setState({ ComplaintDetail: text })}></TextInput>
                <RNPickerSelect
                  Icon={() => {
                    return <Icon
                      underlayColor={false}
                      // raised
                      name='md-arrow-dropdown'
                      type='ionicon'
                      color='#43'
                      size={wp(7)}
                      containerStyle={{ marginLeft: wp(-7), marginTop: wp(1) }}
                    />;
                  }}
                  placeholderTextColor='#00'
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: '--เลือกเลือกชุมชน--',
                    value: '',
                  }}
                  items={this.state.GetCommunity}
                  onValueChange={async (itemValue, itemIndex) => {
                    this._Community(itemValue)
                  }}
                  value={this.state.Community2}
                  style={pickerSelectStyles}
                />
                <View style={{ marginTop: 10, marginLeft: 50, marginRight: 50 }}>
                  <Button title="บันทึก" onPress={this.Addcomplaint} ></Button>
                </View>
                <Text>ComplaintCategory : {this.state.ComplaintCategory}</Text>
                <Text>Com_Id : {this.state.Community2}</Text>
                {this.state.image ? this.renderImage(this.state.image) : null}
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={{ margin: 10 }}>
                    <Image source={require("../image/photocamera.png")} style={{ width: 40, height: 40 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.pickSingle(false)} style={{ margin: 10 }}>
                    <Image source={require("../image/photoselect.png")} style={{ width: 40, height: 40 }}></Image>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
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
    },
    textInput: {
      color: 'black',
      backgroundColor: 'white',
      borderColor: '#126635',
      borderRadius: 10,
      height: 40,
      width: "90%",
      margin: 5,
    },
    button: {
      marginBottom: 10,
      width: 300,
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#3333FF"
    },
  })
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    width: wp(89),
    paddingTop: 13,
    height: wp(10),
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    alignSelf: 'center'
  },
  inputAndroid: {
    fontSize: 14,
    width: wp(89),
    // paddingTop: 15,
    height: wp(10),
    paddingHorizontal: 10,
    // paddingBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    alignSelf: 'center'
  },
});
export default Addcomplaint;
