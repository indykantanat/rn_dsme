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

class Complaint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Complaint: [],
        };
    }
    componentDidMount() {
        this.get();
    }
    get() {
        const url = "http://services.totiti.net/DSME1953Wcf/Service1.svc/";
        axios.get(url + "GetComplaintCategory")
            .then(response => {
                this.setState({ Complaint: response.data.GetComplaintCategoryResult })
                Alert.alert(JSON.stringify(response.data.GetComplaintCategoryResult))
                console.log("Complaint: " + response.data.GetComplaintCategoryResult);
            })
            .catch(err => {
                alert(JSON.stringify(error));
            })
    }
    // async componentDidMount() {
    //     try {
    //         var name = await AsyncStorage.getItem("Name")
    //         await this.setState({ Name: name })
    //     }
    //     catch (error) {
    //         alert(error)
    //     }
    // }
    logout = async () => {
        await AsyncStorage.removeItem('Name')
        this.props.navigation.navigate('Register')
    }
    renderItem(item) {
        const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = style;
        return (
            <TouchableHighlight onPress={() => {
                this.props.navigation.navigate('Listcomplain',
                    {
                        Id: item.Id,
                    });
                console.log("Id: " + item.Id);
            }}>
                <View style={cardStyle}>
                    <Image source={{ uri: item.URLImage }} style={imageItem}></Image>
                    <View style={{ flexDirection: "column", width: "80%", margin: 5 }}>
                        <View style={titleSubtitleSytle}>
                            <Text style={{ color: "#000000EE", fontrrFamily: "Prompt-Regular", fontSize: 18 }}>{item.Name}</Text>

                        </View>
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
                        <View>
                            <Text>{this.state.Name}</Text>
                            <Button title="Logout" onPress={this.logout}></Button>
                        </View>
                        <FlatList data={this.state.Complaint}
                            renderItem={({ item }) => this.renderItem(item)}>
                        </FlatList>
                    </ImageBackground>
                </View> :
                <View>
                    <ImageBackground source={require("../image/bg.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={{ color: "white", marginTop: 20 }}>ไม่มีข้อมูล</Text>
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
            marginBottom: 10,
            borderRadius: 10,
            marginTop: 10,
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
export default Complaint;
