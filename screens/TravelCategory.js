import React from 'react'
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
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';


export default class TravelCat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      TravelCat: [],
    };

  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <View style={{marginLeft:10}}><Text onPress={() => navigation.goBack()}>{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}</Text></View>,
        headerTitle:<View>
            <Text style={{fontFamily:'Prompt-Regular',color:'#FFF',fontSize:20}}>
                {'หมวดหมู่สถานที่ท่องเที่ยว'}
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
    this.get();
  }
  get() {
    const url = "http://203.113.14.18/DCPTCWcfService/Service1.svc/";
    axios.get(url + "GetTravelCategoryByProjectId/1")
      .then(response => {
        this.setState({ TravelCat : response.data.GetTravelCategoryByProjectIdResult })
        // Alert.alert(JSON.stringify(response.data.GetTravelCategoryByProjectIdResult))
      })
      .catch(err => {
        alert(JSON.stringify(error));
      })
  }
  
  // gotoDetailnew = ({item}) => {
  //   const { navigation } = this.props
  //   navigation.navigate('Detailnew',{id:item.ImageURL});
  // }
  renderItem(item) {
    const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = style;
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('TravelSubcategory',{Id:item.Id});
        // console.log("OwnerNamesend: " + item.OwnerName);
      }}>
        <View style={cardStyle}>
          <Image source={{ uri: 'http://'+item.ImageURL }} style={imageItem} PlaceholderContent={<ActivityIndicator />}></Image>
          <View style={{  flexDirection: "column", width: "80%", margin: 6 }}>
            <View style={titleSubtitleSytle}>
              <Text style={{ color: "#000000EE", fontFamily: "Prompt-Regular" ,fontSize:18 }}>{item.Name}</Text>
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
        <ScrollView style={{marginTop: 10,}}>
            <FlatList data={this.state.TravelCat}
              renderItem={({ item }) => this.renderItem(item)}>
            </FlatList>
            </ScrollView>
            </ImageBackground>
           
           
    )
    
  }
}

const style = StyleSheet.create(
  {
    cardStyle: {
            height: 60,
            width: "100%",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            marginBottom: 5,
            borderRadius: 0,
            
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            }, shadowOpacity: 0.35,
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
      width: 50,
      height: 50,
      resizeMode: 'stretch',
      marginLeft: 5,
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
