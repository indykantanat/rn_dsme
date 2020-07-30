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


export default class New extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      news: [],
    };

  }

  componentDidMount() {
    this.get();
  }
  get() {
    const url = "http://203.113.14.18/DCPTCWcfService/Service1.svc";
    axios.get(url + "GetNewCategoryByProjectId/1")
      .then(response => {
        this.setState({ news: response.data.GetNewCategoryByProjectIdResult })
        //Alert.alert(JSON.stringify(response.data.GetTicketOrderByCompliantCateResult))
      })
      .catch(err => {
        alert(JSON.stringify(error));
      })
  }
  static navigationOptions = {
    title: 'kuy',
  };
  // gotoDetailnew = ({item}) => {
  //   const { navigation } = this.props
  //   navigation.navigate('Detailnew',{id:item.ImageURL});
  // }
  renderItem(item) {
    const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = style;
    return (
      <TouchableOpacity onPress={() => {
        this.props.navigation.navigate('Detailnew',
          {
            OwnerName: item.OwnerName,
            ImageURL: item.ImageURL,
            ComplaintDetail: item.ComplaintDetail,
          });
          console.log("OwnerNamesend: " + item.OwnerName);
      }}>
        <View style={cardStyle}>
          <Image source={{ uri: item.ImageURL }} style={imageItem} PlaceholderContent={<ActivityIndicator />}></Image>
          <View style={{ flexDirection: "column", margin: 5 }}>
            <View style={titleSubtitleSytle}>
              <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular" }}>{item.Name}</Text>
              {/* <Text style={{ color: "#000000AA", marginBottom: 10, fontFamily: "Prompt-Regular" }}>{item.CreatedDateString}</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity >
    );
  }
  render() {
    return (
      this.state.news.length != 0 ?
        <View>
          <ImageBackground source={require("../image/violetbg2.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
            <FlatList data={this.state.news}
              renderItem={({ item }) => this.renderItem(item)}>
            </FlatList>
          </ImageBackground>
        </View> :
        <View>
          <ImageBackground source={require("../image/violetbg2.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
            <Text style={{ color: "white", marginTop: 20 }}>ไม่มีข้อมูล</Text>
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
      height: 180,
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
    },
    
  })
