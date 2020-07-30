import React, { Component } from 'react'
import { Text, View, Image, ScrollView, Alert, style, Dimensions } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const origin = { latitude: 13.8841797, longitude: 100.5737435 };
const destination = { latitude: 13.880268, longitude: 100.591321 };

const GOOGLE_MAPS_APIKEY = 'AIzaSyCw0Pn54CgdScV_9k7dVF6QhQ4Ohv3BJ1w';




/* -------------------------- // click from in dex -------------------------- */

export default class ProductDetail extends Component {
  state = {
    Id: this.props.navigation.getParam('Id'),
    data: []
  }
  static navigationOptions = ({ navigation }) => {
    // const  {params} = navigation.state

    // alert(JSON.stringify(navigation))
    return {

      headerLeft: <View style={{ marginLeft: 10 }}><Text onPress={() => navigation.goBack()}>{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}</Text></View>,
      headerTitle: <View>
        <Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20, }}>
          {'รายละเอียดผลิตภัณฑ์'}
        </Text>
      </View>,
      //   title: navigation.getParam('otherParam', 'A Nested Details Screen'),
      headerStyle: {
        backgroundColor: '#6633cc',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };

  };
  componentDidMount() {
    this._getData()
    //alert(JSON.stringify(this.state.data))  
    // console.log(this.state.data)
  }
  _getData() {
    axios.get('http://203.113.14.18/DCPTCWcfService/Service1.svc/GetProductById/'
      + this.state.Id)
      .then(result => {
        this.setState({ data: result.data.GetProductByIdResult[0] })
        //alert(this.state.data.GetProductByIdResult)
        //Alert.alert(JSON.stringify(result.data.GetProductByIdResult[0]))
      })
  }
  render() {

    return (
      <View style={{ flex: 1 }} >
        <ScrollView>
          <Image resizeMode='stretch' height={wp(90)} width={wp(100)} style={{ width: wp(100), height: wp(90) }} source={{ uri: 'http://' + this.state.data.ImageURLProfile }} />
          <Text style={{marginTop:10,fontSize:17,fontFamily:"Prompt-Regular",}}>  {this.state.data.Name} </Text>
          <Text style={{marginTop:10,fontFamily:"Prompt-Light",marginLeft:10}}>{this.state.data.Detail} </Text>
          {/* <Text style={{color:"red",}}> {this.state.data.Latitude} </Text>
          <Text style={{color:"red",}}> {this.state.data.Longitude} </Text> */}
{/*           
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Mapnavigate')
              //alert('คุณต้องการนำทาง?');
            }}
            ><Text>KUY</Text></TouchableOpacity> */}
          
          {/* <Button
            onPress={() => {this.props.navigation.navigate('Mapnavigate')
              //alert('คุณต้องการนำทาง?');
            }}
            title="นำทาง"
          /> */}
          
          {/* <MapView
        initialRegion={{
          latitude: 13.8841797,
          longitude: 100.5737435,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        style={{ height: "50%", width: "100%" }}
        >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
      </MapView> */}
        </ScrollView>





      </View>

    )
  }
}


