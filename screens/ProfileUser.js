import React, { Component } from 'react';


import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  NativeModules,
  KeyboardAvoidingView,
  TouchableOpacity
}
  from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { TouchableHighlight } from 'react-native-gesture-handler';
import RNRestart from 'react-native-restart';
import LinearGradient from 'react-native-linear-gradient';

var ImagePicker = NativeModules.ImageCropPicker

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProfileData: [],
      Value: "",



    };

  }


  static navigationOptions = ({ navigation }) => {

    // alert(JSON.stringify(navigation))
    return {

      headerRight: <View style={{ marginRight: 10 }}><Text onPress={() => navigation.goBack(null)}>{<
        Icon name="md-close" color={'white'} size={25} />}
      </Text>
      </View>,
      headerTitle: <View>
        <Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20 }}>
          {'ข้อมูลสมาชิก'}
        </Text>
      </View>,
      headerStyle: {
        backgroundColor: '#6633cc',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'Regular',
      },
    };

  };






  // componentDidMount() {
  //   this.GetmobileUserByUID();
  //   var value = AsyncStorage.getItem("Value")
  //   this.setState({Value:value})
  //   alert(this.state.Value)
  //   }

  componentDidMount = async () => {
    var value = await AsyncStorage.getItem("Value")
    this.setState({ Value: value })
    this.GetmobileUserByUID();
    //alert(this.state.Value)
  }


  /* --------------------------------- service -------------------------------- */

  GetmobileUserByUID() {
    const url = "http://203.113.14.18/DCPTCWcfService/Service1.svc/";
    axios.get(url + "GetUserMobileByUId/" + this.state.Value)
      .then(response => {
        this.setState({ ProfileData: response.data.GetUserMobileByUIdResult[0] })
        //Alert.alert(JSON.stringify(response.data.GetUserMobileByUIdResult))
        // console.log("GetUserByUId: " + response.data.GetUserMobileByUIdResult);
      })
      .catch(err => {
        alert(JSON.stringify(error));
      })
  }
  /* -------------------------------------------------------------------------- */

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
    return <Image style={{ width: 200, height: 200, resizeMode: "cover", borderRadius: 100 }} source={image}></Image>
  }
  /* -------------------------------------------------------------------------- */



  logout = () => {

    AsyncStorage.clear().then(RNRestart.Restart());

  }
  /* -------------------------------------------------------------------------- */

  render() {
    return (

      <ImageBackground source={require("../image/violetbg2.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
        <ScrollView style={{ backgroundColor: '#eeeeee', flex: 1, flexDirection: "column", width: "100%" }} >
          
          
          <View style={{  marginTop: 10,alignContent:'center',alignItems:'center' }}>
            {this.state.image ? this.renderImage(this.state.image) : null}
           </View>
           {/* <View style={{  flexDirection:'row', marginTop: 10,alignContent:'center',alignItems:'center',marginLeft:120 }}>
           <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} style={{ margin: 10 }}>
              <Image source={require("../image/photocamera.png")} style={{  alignItems:'center',width: 40, height: 40 }}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.pickSingle(false)} style={{ margin: 10 }}>
              <Image source={require("../image/photoselect.png")} style={{ alignItems:'center',width: 40, height: 40 }}></Image>
            </TouchableOpacity>
          </View> */}
          {/* <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"center",marginBottom: 10,marginTop:20}}>
          <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.FirstName}  {this.state.ProfileData.LastName} {"\n"} <Text>{"     "}</Text>{this.state.ProfileData.IdentificationNumber}</Text>
          
          
          </View> */}

          <View >
            <View style={style.TextView} >
              <Text style={style.TextProfileSty}> Username : <Text style={{ color: '#6633cc' }}>{this.state.ProfileData.Username}</Text></Text>
            </View >
            <View style={{ marginVertical: 5 }} />

            {/* <View style={style.TextView} >
              <Text style={style.TextProfileSty}> Password : <Text style={{ color: '#6633cc' }}>{this.state.ProfileData.Password}</Text></Text>
            </View>
 */}


            <Text style={style.TopicText}>ข้อมูลส่วนตัว</Text>
            {/* <Text style={style.TextProfileSty}> ชื่อ {this.state.ProfileData.FirstName} </Text>
            <Text style={style.TextProfileSty}> นามสกุล {this.state.ProfileData.LastName} </Text> */}

            
            {/* <Text style={style.TextProfileSty}> หมายเลขบัตรประจำตัวประชาชน</Text>
            <Text style={style.TextFromBase}> {this.state.ProfileData.IdentificationNumber}</Text> */}

            <Text style={style.TextProfileSty}> อีเมลล์ : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.Email}</Text></Text>
            <Text style={style.TextProfileSty}> เบอร์โทรศัพน์ : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.PhoneNumber}</Text></Text>
            <Text style={style.TextProfileSty}> ที่อยู่ : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.Address}</Text></Text>
            <Text style={style.TextProfileSty}> ภูมิภาค : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.GeographyName}</Text></Text>
            <Text style={style.TextProfileSty}> จังหวัด : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.ProvinceName}</Text></Text>
            <Text style={style.TextProfileSty}> อำเภอ : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.AumphuresName}</Text></Text>
            <Text style={style.TextProfileSty}> ตำบล : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.DistrictName}</Text></Text>
            <Text style={style.TextProfileSty}> หมู่ : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.Swine}</Text></Text>
            <Text style={style.TextProfileSty}> ถนน : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.Road}</Text></Text>
            <Text style={style.TextProfileSty}> ซอย : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.Alley}</Text></Text>
            <Text style={style.TextProfileSty}> รหัสไปรษณีย์ : <Text style={{fontSize:17,fontFamily: "Prompt-Regular",color:"#6633cc"}}>{this.state.ProfileData.Zipcode}</Text></Text>
          </View>

          <View style={{ alignItems: "center", width: "100%", justifyContent: 'center', alignSelf: 'center', }}>
            <TouchableOpacity  onPress={this.logout}>
            <LinearGradient  colors={['#6633cc', '#8C53F0',]} style={style.linearGradient}>
              <Text style={style.BtnText}>
                ออกจากระบบ
                </Text>
                </LinearGradient>
            </TouchableOpacity>
          </View>

        </ScrollView>

      </ImageBackground>


    );
  }
}

const style = StyleSheet.create(
  {
    textInput: {
      fontFamily: "Prompt-Regular",
      color: 'black',
      backgroundColor: 'white',
      // borderColor: '#000',
      // borderRadius: 20,
      height: 38,
      width: 350,
      // marginTop: 5,
      // marginBottom: 4,
      paddingHorizontal: 10,
      // borderColor: 'red',
      borderBottomWidth: 0.3,
      paddingTop: 10,//text input ระยะกึ่งกลาง
      paddingBottom: 10,
    },
    Btn: {
      alignSelf: 'center',
      alignItems: 'center',
      width:"70%",
      padding: 10,
      backgroundColor: '#6633cc',
      marginTop: 20,
      marginLeft: 10,
      borderRadius: 10,
      marginVertical:10,
      marginBottom: 20,
      //marginEnd:100,
    },
    BtnText: {
      color: '#fff',
      fontFamily: 'Prompt-Regular',
      fontSize: 20,
    },
    TextProfileSty: {
      color: 'black',
      fontFamily: "Prompt-Light",
      fontSize: 17,
      backgroundColor: "white",
      marginVertical: 5,
      width: "90%",
      height: "50%",
      alignSelf: 'center',
      height: 35,
      textAlign: 'left',
      textAlignVertical: 'center',
      paddingTop: 6,
      borderRadius: 0,
      borderLeftColor: '#6633cc',
    },
    BtnText: {
      color: '#fff',
      fontFamily: 'Prompt-Regular',
      fontSize: 20,
    },
    TopicText: {
      color: 'black',
      fontFamily: "Prompt-Light",
      fontSize: 17,
      //margin: 0,
      //marginLeft: 0,
      marginVertical: 5,
      width: "90%",
      alignSelf: 'center',
      borderRadius: 0,
      height: 40,
      //textAlign: 'auto',
      //textAlignVertical: 'center',
      paddingTop: 6,
      marginTop:10,
    },
    TextView: {
      backgroundColor: 'white',
      borderColor: '#6633cc',
      borderRadius: 7,
      borderWidth: 4,
      borderLeftColor: '#6633cc',
      borderBottomColor: 'white',
      borderTopColor: 'white',
      borderEndColor: 'white',
      width: "90%",
      marginLeft: 20,
    },
    TextFromBase: {
      color: '#6633cc',
      fontFamily: "Prompt-Light",
      fontSize: 17,
      backgroundColor: "white",
      marginVertical: 5,
      width: "90%",
      height: "50%",
      alignSelf: 'center',
      height: 35,
      textAlign: 'left',
      textAlignVertical: 'center',
      paddingTop: 6,
      borderRadius: 7,
    },
    linearGradient: {
      marginBottom: 10,
      width: 300,
      height: 50,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      borderRadius:5,
      marginTop: 20,
      marginVertical:10,
     
    },




  }
)

export default ProfileUser;
