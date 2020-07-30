import React, { Component } from 'react'
import { Text, View ,Image,ScrollView} from 'react-native'
import {widthPercentageToDP as wp,
        heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';



/* -------------------------- // click from in dex -------------------------- */

export default class Traveldetail extends Component {
    state={
        Id:this.props.navigation.getParam('Id'),
        data:[]
    }
    static navigationOptions = ({ navigation }) => {
        // const  {params} = navigation.state
       
        // alert(JSON.stringify(navigation))
        return {
          
            headerLeft:<View style={{marginLeft:10}}><Text onPress={()=>navigation.goBack()}>{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}</Text></View>,
            headerTitle:<View>
                <Text style={{fontFamily:'Prompt-Regular',color:'#FFF',fontSize:20,}}>
                     {'รายละเอียดสถานที่ท่องเที่ยว'} 
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
        // alert(JSON.stringify(this.state.data))  
        // console.log(this.state.data)
    }
    _getData(){
        axios.get('http://203.113.14.18/DCPTCWcfService/Service1.svc/GetTravelById/'
        +this.state.Id)
        .then(result=>{
            this.setState({data:result.data.GetTravelByIdResult[0]})
            // alert(this.state.data.GetTravelByIdResult)
        })
    }
    render() {
        return (
                <View style={{flex:1}}>

                <ScrollView>
                <Image resizeMode='stretch' height={wp(90)} width={wp(100)} style={{width:wp(100),height:wp(90)}} source={{uri:'http://'+this.state.data.ImageURLProfile}}/>
                <Text style={{marginTop:10, fontSize:15,fontFamily:"Prompt-Regular",}}>  {this.state.data.Name} </Text>
                <Text style={{marginTop:10,fontFamily:"Prompt-Light",marginLeft:10}}>{this.state.data.Detail} </Text>
                
                </ScrollView>
                </View>
            
        )
    }
}
