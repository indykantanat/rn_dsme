import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
export default class NewsDetail extends Component {
    state = {
        Id: this.props.navigation.getParam('Id'),
        data:[]
    }
    static navigationOptions = ({ navigation }) => {
        // const  {params} = navigation.state

        // alert(JSON.stringify(navigation))
        return {
            // headerRight:<View><Text onPress={()=>params.test2()}>{'test'}</Text></View>,
            headerLeft: <View style={{marginLeft:10}}><Text onPress={() => navigation.goBack()}>{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}</Text></View>,
            headerTitle: <View>
                <Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF',fontSize:20 }}>
                     {'รายละเอียดข่าวสาร'} 
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
        // alert(JSON.stringify(this.state.data))
    }
    _getData() {
        axios.get('http://203.113.14.18/DCPTCWcfService/Service1.svc/GetNewsById/'
            + this.state.Id)
            .then(result => {
                this.setState({ data: result.data.GetNewsByIdResult[0] })
                //alert(this.state.data)
            })
    }
    render() {
        return (
            <View style={{ flex: 1 }}>

                <ScrollView>
                    <Image resizeMode='stretch' height={wp(90)} width={wp(100)} style={{ width: wp(100), height: wp(90) }} source={{ uri: 'http://' + this.state.data.ImageURLProfile }} />
                    <Text style={styles.TextHeader}>    {this.state.data.Name} </Text>
                    <Text style={styles.TextDetail}>{this.state.data.Detail} </Text>
                </ScrollView>
            </View>

        )
    }
}

const styles = StyleSheet.create(
    {
        TextHeader: {
            fontFamily: "Prompt-Medium",
            fontSize: 16,
            
        },
        TextDetail: {
            color: "#000000EE",
            fontFamily: "Prompt-Light",
            fontSize: 16,
            marginLeft:10,
        },





    })
