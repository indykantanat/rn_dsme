import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	ImageBackground,
	TextInput,
	StyleSheet,
	ScrollView,
	AsyncStorage,
	Alert,
	KeyboardAvoidingView,
	TouchableOpacity,
	NativeModules,
} from 'react-native';

import { Button, CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

import { thisExpression } from '@babel/types';
var ImagePicker = NativeModules.ImageCropPicker;
import { NavigationContainer } from '@react-navigation/native';
class Termofservice extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (
				<View style={{ marginLeft: 10 }}>
					<Text onPress={() => navigation.goBack()}>
						{<Icon name="ios-arrow-round-back" color={'white'} size={40} />}
					</Text>
				</View>
			),
			headerTitle: (
				<View>
					<Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20 }}>{''}</Text>
				</View>
			),

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
			<ScrollView style={{ flexGrow: 1, width: '100%', backgroundColor: '#ECEBF1' }}>
				<View style={{ marginTop: 20 }}>
					<Text style={style.Headtopic}>ข้อกำหนดและเงื่อนไขการใช้บริการ</Text>
					<Text style={style.Detail}>ทดสอบ</Text>
				</View>
			</ScrollView>
		);
	}
}

const style = StyleSheet.create({
	Headtopic: {
		fontSize: 15,
		fontFamily: 'Prompt-Regular',
		textAlign: 'center',
	},
	Detail: {
		fontSize: 13,
		fontFamily: 'Prompt-Light',
		textAlign: 'center',
	},
});

export default Termofservice;
