import React, { Component } from 'react'
import { Text, View, Image, ScrollView, Alert, style, Dimensions, ImageBackground,StyleSheet } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { Button } from 'react-native-elements';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export class Vision extends Component {
    
    static navigationOptions = ({ navigation }) => {

        return {

            headerLeft: <View style={{ marginLeft: 10 }}><Text onPress={() => navigation.goBack()}>{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}</Text></View>,
            headerTitle: <View>
                <Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20, }}>
                    {'วิสัยทัศน์/พันธกิจ'}
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

    render() {
        return (
            <ImageBackground source={require("../image/violetbg2.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
            <View style={{flex:1}}>
                <Text style={styles.Detail}> วิสัยทัศน์ของเทศบาลเมืองสนั่นรักษ์  </Text>
                <Text style={styles.TitleDetail}>  " เมืองสนั่นรักษ์เป็นเมืองน่าอยู่  ประชาชนมีคุณภาพชีวิตที่ดี  มีความสุข  มีความมั่นคงทางเศรษฐกิจ
ชุมชนได้รับการบริการงานโครงสร้างพื้นฐานเป็นอย่างดีและทั่วถึง  โดยเกิดจากความร่วมมือของรัฐและประชาชน "</Text>
            </View>
            </ImageBackground>
        )
    }
}


const styles = StyleSheet.create(
    {
        Detail: {
            
            fontFamily: "Prompt-Regular",
            color: '#000',
            fontSize: 20,
            alignSelf:'center'
            

        },
        TitleDetail: {
            
            fontFamily: "Prompt-Light",
            color: '#000',
            fontSize: 16,
            
            

        }




    })
export default Vision
