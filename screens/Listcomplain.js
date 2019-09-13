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
    TouchableHighlight
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class Listcomplain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.navigation.getParam('Id'),
            Complaint: [],
        };
    }
    static navigationOptions = {
        title: 'เรื่องร้องเรียน',
    };
    componentDidMount() {
        this.get();
    }
    get() {
        const url = "http://services.totiti.net/DSME1953Wcf/Service1.svc/";
        // console.log("url: " + url+"GetTicketOrderByCompliantCate/"+this.state.Id);
        axios.get(url + "GetTicketOrderByCompliantCate/" + this.state.Id)
            .then(response => {
                this.setState({ Complaint: response.data.GetTicketOrderByCompliantCateResult })
            })
            .catch(err => {
                alert(JSON.stringify(error));
            })
    }
    renderItem(item) {
        const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = style;
        let ColorStatus
        if (item.Status == "1") {
            ColorStatus = "red"
        } else if (item.Status == "2") {
            ColorStatus = "green"
        }
        return (
            <TouchableHighlight style={{margin:10}} onPress={() => {
                this.props.navigation.navigate('Detailcomplain',
                    {
                        Id: item.Id,
                        ImageURL: item.ImageURL,
                        Segment: item.Segment,
                        Value: item.Value,
                        OwnerName: item.OwnerName,
                        Com_Name: item.Com_Name,
                        ComplaintDetail: item.ComplaintDetail,
                        CreatedDateString: item.CreatedDateString,
                    });
                console.log("Id: " + item.Id);
            }}>
                <View style={cardStyle}>
                    <Image source={{ uri: item.ImageURL }} style={imageItem}></Image>
                    <View style={{ flexDirection: "row", width: "75%", margin: 5 }}>
                        <View style={titleSubtitleSytle}>
                            <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular", fontSize: 18 }}>{item.ComplaintDetail}</Text>
                            <Text style={{ color: "#7F8C8D", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>{item.Com_Name}</Text>
                            <Text style={{ color: "#7F8C8D", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>{item.CreatedDateString}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Icon name="circle" color={ColorStatus} ></Icon>
                    </View>
                </View>
            </TouchableHighlight >
        );
    }
    render() {
        return (
            this.state.Complaint.length != 0 ?
                <View>
                    <ImageBackground source={require("../image/bg.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
                        <Button title="เพิ่มเรื่องร้องเรียน" onPress={() => { this.props.navigation.navigate('Addcomplaint', { Id: this.state.Id }) }}></Button>
                        <FlatList data={this.state.Complaint}
                            renderItem={({ item }) => this.renderItem(item)}>
                        </FlatList>
                    </ImageBackground>
                </View> :
                <View>
                    <ImageBackground source={require("../image/bg.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: "white", marginTop: 20 }}>ไม่มีข้อมูล</Text>
                        <Button title="เพิ่มเรื่องร้องเรียน" onPress={() => { this.props.navigation.navigate('Addcomplaint', { Id: this.state.Id }) }}></Button>
                    </ImageBackground>
                </View>
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
            marginLeft: 16,
            marginRight: 16,
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
export default Listcomplain;
