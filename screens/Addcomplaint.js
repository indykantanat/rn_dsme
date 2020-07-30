import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Icon, Button } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
import { Dropdown } from 'react-native-material-dropdown';
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
  ActivityIndicator,
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
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';

//import Icon from 'react-native-vector-icons/Ionicons';

/* -------------------------------------------------------------------------- */

class Addcomplaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ComplaintCategoryId: this.props.navigation.getParam('Id'),
      ProjectId: 1,
      LastName: "",
      Mobile: "",
      Email: "",
      IdCard: "",
      Detail: "",
      GetCommunity: [],
      Community: "",
      Community2: "",
      userLocation: {},
      image: [],
      TicketOrderId: "",
      ImageUrl: "",
      //Latitude: "",
      PhoneNumber: "",
      Topic: "",
      isModalVisible: false,
      UMCreateBy: '',
      ComplaintId: '',
      ProjectId: 1,

    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
     
      
      headerTitle: <View>
        <Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20 }}>
          {'เพิ่มเรื่องร้องทุกข์'}
        </Text>
      </View>,

      headerStyle: {
        backgroundColor: '#6633cc',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };

  };

  /* ---------------------------- call medthod do  ----------------------------------------------------------- */

  componentDidMount() {
    //this.getUser();
    this.getCommunity();
    AsyncStorage.getItem("Value")
    .then(result => {
      //alert(result)
      this.setState({ UMCreateBy : result })
    })

    // this.Addcomplaint();
    /* ---------------------------------------------------------------------------------------------------------- */

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
        console.log("USERLOCATION latitude  : " + this.state.userLocation.latitude);
        console.log("USERLOCATION longitude : " + this.state.userLocation.longitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 60000, maximumAge: 10000 }
    );
  }
  /* -------------------------------------------------------------------------- */



  getCommunity() {
    let url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/'
    axios.get(url + "GetCommunityByDistrictId/379")
      .then(data => {
        //alert(JSON.stringify(data.data.GetCommunityResult))
        this.setState({
          GetCommunity: data.data.GetCommunityByDistrictIdResult.map((i, index) => {
            return { value: i.Id, label: i.Name }
          })
        })
      })
  }
  /* -------------------------------------------------------------------------- */

  _Community = (Community2) => {
    this.setState({
      Community2: Community2
    })

  }

  /* -------------------------------------------------------------------------- */

  Addcomplaint = () => {
    console.log('LATITUDE: ' + this.state.userLocation.latitude);
    console.log('LONGITUDE: ' + this.state.userLocation.longitude);


    if (this.state.Topic.length == '') {
      Alert.alert('กรุณากรอกเรื่องร้องทุกข์')
    } else if (this.state.Detail.length == '') {
      Alert.alert('กรุณากรอกรายละเอียด')
    } else if (this.state.Community2.length == '') {
      Alert.alert('กรุณาเลือกชุมชนของท่าน')
    } else if (this.state.image.length == '') {
      Alert.alert('กรุณาแนบรูปของท่าน')


    }

    else {

      //const url = "http://203.113.14.18/DCPTCWcfService/Service1.svc/";
      axios.post("http://203.113.14.18/DCPTCWcfService/Service1.svc/InsertComplaint", {
        Topic: this.state.Topic,
        Detail: this.state.Detail,
        CommunityId: this.state.Community2,
        ComplaintCategoryId: this.state.ComplaintCategoryId,
        Latitude: this.state.userLocation.latitude,
        Longitude: this.state.userLocation.longitude,
        ProjectId: 1,
        UMCreateBy: this.state.UMCreateBy,
      })
        .then(result => {
          console.log(JSON.stringify(result.data))
          //Alert.alert('เสร็จสิ้น')

          if (result.data.Success == true) {
            this.setState({ ComplaintId: result.data.Value });
            console.log("ComplaintId :", this.state.ComplaintId);
            this.Addimage()

          }
        })
    }
  }

  /* -------------------------------------------------------------------------- */

  Addimage = () => {
    var dateFormat = require('dateformat');
    var now = dateFormat(now, "yyyymmddHHMMss");
    console.log("dateFormat :", now);
    this.setState({ ImageUrl: this.state.ProjectId + "_" + now + ".jpg" });

    console.log("ImageUrl :", this.state.ImageUrl);
    const data = new FormData();
    data.append('myFile', {
      uri: this.state.image.uri,
      type: 'image/jpeg', // or photo.type
      name: this.state.ProjectId + "_" + now + '.jpg'
    });

    fetch("http://203.113.14.18/DCPTCWebsite/Images/ImageComplaints/android_upload_image.php", {
      method: "POST",
      body: data
    }).then((resp) => {
      // alert("successful")              
      // console.log("image: " + this.state.ImageUrl);

      console.log(JSON.stringify(resp.data));
    }).catch(err => {
      // alert("unsuccessful")
      // console.log("image notuploaded");
    });

    if (this.state.ImageURl == '') {
      Alert.alert('กรุณาแนบรูปภาพของท่าน')
    }
    else {

      axios.post("http://203.113.14.18/DCPTCWcfService/Service1.svc/InsertComplaintImage", {
        ComplaintId: this.state.ComplaintId,
        ImageURl: "Images/ImageComplaints/" + this.state.ImageUrl

      }).then(result => {
        Alert.alert('เสร็จสิ้น\nเลื่อนลงเพื่ออัปเดตรายการ')
        console.log("result :", result);
        this.props.navigation.navigate("Listcomplain")
      })
    }
  }
  /* -------------------------------------------------------------------------- */

  openCamera() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      //console.log(image);
      console.log("Image user is :" + image);

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
  /* -------------------------------------------------------------------------- */

  renderImage(image) {
    return <Image style={{ width: 200, height: 200, resizeMode: "cover" }} source={image}></Image>
  }
  /* -------------------------------------------------------------------------- */

  render() {

    return (
      <View >

        {/* <Modal> */}
        {/* <Modal isVisible={true}> */}
        {/* <Modal  animationType="fade"  isVisible={true} style={{width:"100%"}} > */}
        <ImageBackground source={require("../image/violetbg2.png")} resizeMode="cover" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
          <View style={{ height: "100%", width: "100%", marginTop: 10 }}>
            <ScrollView >
              <View style={{ alignItems: "center" }}>

                <TextInput style={style.textInput} 
                placeholder="เรื่อง" autoCorrect={false}
                  autoCapitalize={'none'} 
                  placeholderTextColor="grey" 
                  keyboardType={"default"} 
              
                  onChangeText={(text) => this.setState({ Topic: text })}>
                  </TextInput>
               
                <TextInput style={{ backgroundColor: "white", width: "90%", height: 100,padding:3, }} autoCorrect={false}
                  autoCapitalize={'none'} 
                  multiline numberOfLines={100} 
                  placeholder="รายละเอียด" 
                  placeholderTextColor="grey" 
                  keyboardType={"default"} 
                  onChangeText={(text) => this.setState({ Detail: text })}>
                  </TextInput>

                {/* </View> */}
                {/* <RNPickerSelect
                  Icon={() => {
                    return <Icon
                      underlayColor={true}
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
                    label: '--เลือกชุมชนของท่าน--',
                    value: '',
                  }}
                  items={this.state.GetCommunity}
                  onValueChange={async (itemValue, itemIndex) => {
                    this._Community(itemValue)
                  }}
                  value={this.state.Community2}
                  style={pickerSelectStyles}
                /> */}
                <View style={style.CardBackgroud}>
                  <Dropdown itemTextStyle={style.TextinputDropdown} style={style.TextinputDropdown} onChangeText={(value) => { this._Community(value) }} data={this.state.GetCommunity} label='ชุมชน' />
                </View>
                {this.state.image ? this.renderImage(this.state.image) : null}
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)} style={{ margin: 10 }}>
                    <Image source={require("../image/photocamera.png")} style={{ width: 40, height: 40 }}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.pickSingle(false)} style={{ margin: 10 }}>
                    <Image source={require("../image/photoselect.png")} style={{ width: 40, height: 40 }}></Image>
                  </TouchableOpacity>
                </View>


                <View style={{ flexDirection: "column", flex: 1 }}>
                
                  <TouchableOpacity  onPress={() => this.Addcomplaint()} >
                  <LinearGradient  colors={['#6633cc', '#8C53F0',]} style={style.linearGradient}>
                    <Text style={style.BtnText}>ส่งเรื่องร้องทุกข์</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  

                  
                  <TouchableOpacity  onPress={() => this.props.navigation.goBack(null)} >
                  <LinearGradient  colors={['#6633cc', '#8C53F0',]} style={style.linearGradient}>
                    <Text style={style.BtnText}>ยกเลิก</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                </View>


              </View>
{/* 
              <Text >ComplaintCategory Id : {this.state.ComplaintCategoryId}</Text>
              <Text >CommunityId : {this.state.Community2}</Text>
              <Text >Topic : {this.state.Topic}</Text>
              <Text >Detail : {this.state.Detail}</Text> */}


            </ScrollView>
          </View>
        </ImageBackground>
        {/* </Modal>  */}
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
      borderColor: 'grey',
      //borderRadius: 10,
      height: 40,
      width: "90%",
      margin: 5,
      padding:3,

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
    Btn: {
      //alignSelf: 'stretch',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#6633cc',
      marginTop: 10,
      borderRadius: 10,
      //marginRight:30,
      marginHorizontal: 20
    },

    BtnText: {
      color: '#fff',
      fontFamily: 'Prompt-Regular',
      fontSize: 20,



    },
    TextinputDropdown: {
      fontSize: 15,
      fontFamily: 'Prompt-Regular',
      width: '100%'

    },
    CardBackgroud: {
      backgroundColor: 'white',
      width: '90%',
      marginTop: 5,
      //borderRadius: 10,
      padding: 10,
      //flex: 1,
      justifyContent: "center",
      alignSelf: 'center',
      marginVertical: 10,
      height: 47
    },
    TextinputDropdown: {
      fontSize: 15,
      fontFamily: 'Prompt-Regular',
      width: '100%'

    },
    linearGradient: {
      marginBottom: 10,
      width: 300,
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      borderRadius:5,
     
    },

  });
// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     width: wp(89),
//     paddingTop: 13,
//     height: wp(10),
//     paddingHorizontal: 10,
//     paddingBottom: 12,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     backgroundColor: 'white',
//     color: 'black',
//     alignSelf: 'center'
//   },
//   inputAndroid: {
//     fontSize: 14,
//     width: wp(89),
//     // paddingTop: 15,
//     height: wp(10),
//     paddingHorizontal: 10,
//     // paddingBottom: 12,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     backgroundColor: 'white',
//     color: 'black',
//     alignSelf: 'center'
//   },


// });



export default Addcomplaint;
