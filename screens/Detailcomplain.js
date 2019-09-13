import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Alert,
    ImageBackground,
    Image,
    StyleSheet,
    Easing,
    TextInput,
    ScrollView,
    FlatList
} from 'react-native';
import axios from 'axios';

class Detailcomplain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.navigation.getParam('Id'),
            ImageURL: this.props.navigation.getParam('ImageURL'),
            Segment: this.props.navigation.getParam('Segment'),
            Value: this.props.navigation.getParam('Value'),
            OwnerName: this.props.navigation.getParam('OwnerName'),
            Com_Name: this.props.navigation.getParam('Com_Name'),
            ComplaintDetail: this.props.navigation.getParam('ComplaintDetail'),
            CreatedDateString: this.props.navigation.getParam('CreatedDateString'),
            Comment: "",
            getComment: []
        };
    }
    static navigationOptions = {
        title: 'Detail',
    };
    addComment = () => {
        const url = "http://services.totiti.net/DSME1953Wcf/Service1.svc/";
        axios.post(url + "TicketComment/Add", {
            TicketOrder: this.state.Id,
            Comment: this.state.Comment,
            OwnerName: this.state.OwnerName,
        }).then(result => {
            Alert.alert('เสร็จสิ้น')
            this.getComment();
            
        })
    }
    componentDidMount() {
        this.getComment();
    }
    getComment() {
        const url = "http://services.totiti.net/DSME1953Wcf/Service1.svc/";
        // console.log("url: " + url+"GetTicketOrderByCompliantCate/"+this.state.Id);
        axios.get(url + "GetTicketCommentByTicketOrder/" + this.state.Id)
            .then(response => {
                this.setState({ getComment: response.data.GetTicketCommentByTicketOrderResult })
                console.log("getComment: " + response.data.GetTicketCommentByTicketOrderResult);
            })
            .catch(err => {
                alert(JSON.stringify(error));
            })
    }
    renderItem(item) {

        return (
            <View style={{ flexDirection: "column", width: "100%" }}>
                <View style={{flexDirection: "column"}}>
                    <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular", fontSize: 18 }}>{item.Comment}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                        <Text style={{ color: "#7F8C8D", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>{item.CreatedDateString}</Text>
                    </View>
                </View>
            </View>

        );
    }
    render() {
        return (
            <View>
                <ImageBackground source={require("../image/bg.png")} resizeMode="stretch" style={{ width: "100%", height: "100%" }}>
                    <ScrollView>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <Image source={{ uri: this.state.ImageURL }} style={{ width: "90%", height: 180, margin: 20 }}></Image>
                            {/* <ZoomImage source={{ uri: this.state.ImageURL }} style={{ width: "90%", height: 180, margin: 20 }}
                  duration={200}
                  enableScaling={false}
                  easingFunc={Easing.ease}>
                </ZoomImage> */}
                            <View style={{ backgroundColor: "white", width: "95%" }}>
                                <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>ผู้ดำเนินงาน : {this.state.Segment}</Text>
                                <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>สถานะ : {this.state.Value}</Text>
                                <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>ชื่อผู้ร้องเรียน : {this.state.OwnerName}</Text>
                                <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>ชุมชน : {this.state.Com_Name}</Text>
                                <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>รายละเอียด : {this.state.ComplaintDetail}</Text>
                                <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>เมื่อ : {this.state.CreatedDateString}</Text>
                                <View style={{ backgroundColor: "#126635", width: "100%" }}>
                                    <Text style={{ color: "white", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>ใส่รายละเอียด</Text>
                                </View>
                                <TextInput style={style.textInput} placeholder="คอมเม้น" placeholderTextColor="gray" keyboardType={"default"} onChangeText={(text) => this.setState({ Comment: text })}></TextInput>
                                <Button title="บันทึก" onPress={this.addComment} ></Button>
                                <View style={{ backgroundColor: "#126635", width: "100%" }}>
                                    <Text style={{ color: "white", fontrrFamily: "Prompt-Regular", fontSize: 16 }}>ติดตามงาน</Text>
                                </View>
                                <FlatList data={this.state.getComment}
                                    renderItem={({ item }) => this.renderItem(item)}>
                                </FlatList>
                            </View>

                        </View>
                    </ScrollView>
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
            borderColor: '#126635',
            borderRadius: 10,
            height: 40,
            width: 320,
            margin: 5,
        }
    })
export default Detailcomplain;
