import React, { Component } from 'react'
import { Text, View ,Image,ScrollView,Alert,style,Dimensions,Linking} from 'react-native'
import {widthPercentageToDP as wp,
        heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView,{ Marker,Callout,PROVIDER_GOOGLE }  from 'react-native-maps'; 



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

export default class Mapnavigate extends Component {
    state={
        Id:this.props.navigation.getParam('Id'),
        data:[]
    }
    static navigationOptions = ({ navigation }) => {
        // const  {params} = navigation.state
       
        // alert(JSON.stringify(navigation))
        return {
          
            headerLeft:<View style={{marginLeft:10}}><Text onPress={()=>navigation.goBack()}>{<Icon name="ios-arrow-round-back"color={'white'} size={40}  />}</Text></View>,
            headerTitle:<View>
                <Text style={{fontFamily:'Prompt-Regular',color:'#FFF',fontSize:20,}}>
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
    componentDidMount(){
        this._getData()
         //alert(JSON.stringify(this.state.data))  
        // console.log(this.state.data)
    }
    _getData(){
        axios.get('http://203.113.14.18/DCPTCWcfService/Service1.svc/GetProductById/'
        +this.state.Id)
        .then(result=>{
            this.setState({data:result.data.GetProductByIdResult[0]})
              //alert(this.state.data.GetProductByIdResult)
              //Alert.alert(JSON.stringify(result.data.GetProductByIdResult[0])) 
        })
    }
    render() {
      
        return (
                <View style={{flex:1}} > 
                   
                <MapView
         provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 13.8841797,
          longitude: 100.5737435,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        style={{ height: "100%", width: "100%" }}
        >
          <Marker coordinate={{ latitude: 13.8142851, longitude: 100.5555916 }}>
                <Callout onPress={() => { Linking.openURL(
                  //"http://maps.google.com/maps?q=loc:" + "13.8142851"+ "," + "100.5555916" + "(Label which you want)"
                  "http://maps.apple.com/?ll=13.8142851,100.5555916"
                  ) }}>
                  
                  <Text style={{ color: "black", fontWeight: "bold", textAlign: "center" }}>hello world</Text>
                  <Text style={{ color: "black", textAlign: "center" }}>test2</Text>
                </Callout>
              </Marker>
           
           
           
           {/* <Marker
      coordinate={{ latitude: 13.8142851,
       longitude:100.5555916}}
      title={"KUY"}
      description={"kuy rai yom"} */}
                     {/* /> */}
        {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        /> */}
      </MapView>
                
                  
                               
            
                
                
                </View>
            
        )
    }
}


