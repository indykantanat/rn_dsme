import React, { Component }  from 'react'
import axios from 'axios';
import {
  Platform,
  StyleSheet,
  View,
  Button,
  Alert,
  TouchableHighlight,
  Text,
  FlatList,
  ImageBackground,
  Linking,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

export default class NewsSubcategory extends Component {
    state={
        Id:this.props.navigation.getParam('Id'),
        data:[]
    }
    static navigationOptions = ({ navigation }) => {
        const  {params} = navigation.state
       
        // alert(JSON.stringify(navigation))
        return {
            headerLeft:<View style={{marginLeft:10}}><Text onPress={()=>navigation.goBack()}>{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}</Text></View>,
            headerTitle:<View>
                <Text style={{fontFamily:'Prompt-Regular',color:'#FFF',fontSize:20,}}>
                     {'รายการข่าวสาร'} 
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
    }

    _getData(){
        axios.get('http://203.113.14.18/DCPTCWcfService/Service1.svc/GetNewsByProjectIdAndNewCategoryId/1/'
        +this.state.Id)
        .then(result=>{
            this.setState({data:result.data.GetNewsByProjectIdAndNewCategoryIdResult})
        })
    }
    renderItem(item) {
        const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = style;
        return (
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('NewsDetail',{Id:item.Id});
              //console.log("OwnerNamesend: " + item.OwnerName);
          }}>
            <View style={cardStyle}>
              <Image source={{ uri: 'http://'+item.ImageURLProfile }} style={imageItem} PlaceholderContent={<ActivityIndicator />}></Image>
              <View style={{ flexDirection: "column", margin: 5 }}>
                <View style={titleSubtitleSytle}>
                  <Text style={{ color: "#000000EE", fontFamily: "Prompt-Regular" }}>{item.Name}</Text>
                  {/* <Text style={{ color: "#000000AA", marginBottom: 10, fontFamily: "Prompt-Regular" }}>{item.CreatedDateString}</Text> */}
                </View>
              </View>
            </View>
          </TouchableOpacity >
        );
      }
    render() {
        return (
            <ImageBackground source={require("../image/violetbg2.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
            <View style={{flex:1,flexDirection: "row",marginTop:20}}> 
              <FlatList data={this.state.data}
                renderItem={({ item }) => this.renderItem(item)}>
              </FlatList>
              </View> 
              </ImageBackground>
        )
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
            marginLeft: 5,
            // marginRight: 10,
            // marginTop: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 5,
            }, shadowOpacity: 0.34,
            shadowRadius: 6.27,
      
            elevation: 10,
            marginEnd:10,
           
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
        height: 190,
        resizeMode: 'stretch',
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
