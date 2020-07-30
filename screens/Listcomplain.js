import React, { Component } from 'react';
import {
    View,
    Text,
    AsyncStorage,
    Button,
    ImageBackground,
    FlatList,
    Image,
    StyleSheet,
    TouchableHighlight,
    Alert,
    RefreshControl,
    TouchableOpacity,



} from 'react-native';
import axios from 'axios';
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';




class Listcomplain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.navigation.getParam('Id'),
            Complaint: null,
            loading: true

        };

    }

    /* -------------------------------------------------------------------------- */

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <View style={{ marginLeft: 10 }}><Text onPress={() => navigation.goBack()}>{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}</Text></View>,
            headerTitle: <View>
                <Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20 }}>
                    {'รายการร้องทุกข์'}
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
    /* -------------------------------------------------------------------------- */


    componentDidMount() {
        //alert(this.state.Id)
        this.get();

    }

    get() {
        const url = "http://203.113.14.18/DCPTCWcfService/Service1.svc/";
        // console.log("url: " + url+"GetTicketOrderByCompliantCate/"+this.state.Id);
        axios.get(url + "GetComplaintByComplaintCategoryId/" + this.state.Id)
            .then(response => {
                this.setState({ Complaint: response.data.GetComplaintByComplaintCategoryIdResult, loading: false })
                //Alert.alert(JSON.stringify(response.data.GetComplaintByComplaintCategoryIdResult))
                console.log(response.data.GetComplaintByComplaintCategoryIdResult)
            })
            .catch(err => {
                alert(JSON.stringify(error));
            })
    }
    renderItem(item) {
        const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick, Button } = style;

        return (
            <TouchableHighlight underlayColor={false} style={{ margin: 10 }} onPress={() => {
                this.props.navigation.navigate('Detailcomplain',
                    {
                        Id: item.Id,
                        Topic: item.Topic,
                        ImageURLProfile: item.ImageURLProfile,
                        Detail: item.Detail,
                        CommunityName: item.CommunityName,
                        Latitude: item.Latitude,
                        Longitude: item.Longitude,
                        UMCreate: item.UMCreate,
                        Status: item.Status
                    });
                console.log("Id: " + item.Id);
                console.log("Topic: " + item.Topic);
                console.log("ImageURLProfile: " + item.ImageURLProfile);
                console.log("Detail: " + item.Detail);
                console.log("Latitude: " + item.Latitude);
                console.log("Longitude: " + item.Longitude);
                console.log("CommunityName: " + item.CommunityName);
                console.log("UMCreate: " + item.UMCreate);

            }}>
                <View style={cardStyle}>
                    <Image source={{ uri: 'http://' + item.ImageURLProfile }} style={imageItem}></Image>
                    <View style={{ flexGrow: 1, flexDirection: "row" }}>
                        <View style={titleSubtitleSytle}>
                            <Text style={{ fontSize:16, }}>{item.Topic}</Text>

                        </View>
                    </View>
                    {/* <View style={{ flexDirection: "row", alignItems: "center" }}>

                    </View> */}
                </View>
            </TouchableHighlight >

        );
    }

    _test = () => {
        this.setState({ loading: true })
        this.get()
    }
    render() {


        return (
            this.state.Complaint == null ? 
            <View>

            </View> :
            
                <ImageBackground source={require("../image/violetbg2.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl refreshing={this.state.loading} onRefresh={this._test} />
                        }
                        style={{ flex: 1, width: "100%" }} >
                        <FlatList data={this.state.Complaint} renderItem={({ item }) => this.renderItem(item)} />

                    </ScrollView>



                    <TouchableOpacity style={{marginVertical:20}} onPress={() => { this.props.navigation.navigate('Addcomplaint', { Id: this.state.Id }) }} >
                    <LinearGradient  colors={['#6633cc', '#8C53F0',]} style={style.linearGradient}>
                        <Text style={style.BtnText}>
                            เพิ่มเรื่องร้องทุกข์
                           </Text>
                           </LinearGradient>
                    </TouchableOpacity>


                </ImageBackground>


        );
    }
}














const style = StyleSheet.create(
    {
        cardStyle: {
            height: 80,
            width: "100%",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            // marginBottom: 10,
            borderRadius: 10,
            // marginTop: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,

            elevation: 13,
        },
        avatarStyle: {
            width: 45,
            height: 45,
            borderRadius: (45 / 2)
        },
        titleSubtitleSytle: {
            flexDirection: "column",
            marginLeft: 16,
            width: "81%",
            // height:"100%"
            //marginRight: 16,
        },
        imageItem: {
            width: 65,
            height: 65,
            resizeMode: 'stretch',
            marginLeft: 10,
            //borderTopLeftRadius: 10,
            //borderTopRightRadius: 10,
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
        BtnAddcompain: {
            padding: 100,
            width: 200,
            borderRadius: 24,
            alignItems: 'center',
            color: 'white',
        },

        Btn: {
            //alignSelf:'stretch',
            alignItems: 'center',
            padding: 10,
            backgroundColor: "#6633cc",
            borderRadius: 10,
            marginVertical: 20,

        },

        BtnText: {
            color: '#fff',
            fontFamily: 'Prompt-Regular',
            fontSize: 20,
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

    })
export default Listcomplain;
