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
	ScrollView,
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
		const url = 'http://203.113.14.18/DCPTCWcfService/Service1.svc/';
		axios
			.get(url + 'GetComplaintCategoryByProjectId/1')
			.then(response => {
				this.setState({ Complaint: response.data.GetComplaintCategoryByProjectIdResult });
			})
			.catch(err => {
				alert(JSON.stringify(error));
			});
	}

	// logout = async () => {
	//     await AsyncStorage.removeItem('Name')
	//     this.props.navigation.navigate('Register')
	// }

	renderItem(item) {
		const { cardStyle, avatarStyle, titleSubtitleSytle, imageItem, textClick } = styles;
		return (
			<TouchableHighlight
				underlayColor={false}
				onPress={() => {
					this.props.navigation.navigate('Listcomplain', {
						Id: item.Id,
					});
					console.log('Id: ' + item.Id);
				}}
			>
				<View style={cardStyle}>
					<Image source={{ uri: 'http://' + item.ImageURL }} style={imageItem}></Image>
					<View style={{ flexDirection: 'column', width: '80%', margin: 5 }}>
						<View style={titleSubtitleSytle}>
							<Text style={{ color: '#000000EE', fontFamily: 'Prompt-Regular', fontSize: 18 }}>
								{item.Name}
							</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
	render() {
		return (
			<View>
				<ImageBackground
					source={require('../image/violetbg2.png')}
					resizeMode="stretch"
					style={{ width: '100%', height: '100%', justifyContent: 'flex-start', alignItems: 'center' }}
				>
					<View>
						<Text>{this.state.Name}</Text>
					</View>
					<FlatList data={this.state.Complaint} renderItem={({ item }) => this.renderItem(item)}>
						<TouchableHighlight underlayColor={false}>
							{' '}
							onPress=
							{() => {
								this._goto(item.Id);
							}}
						</TouchableHighlight>
					</FlatList>
				</ImageBackground>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	cardStyle: {
		height: 60,
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		marginBottom: 5,
		borderRadius: 0,

		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.35,
		shadowRadius: 6.27,

		elevation: 10,
	},
	avatarStyle: {
		width: 45,
		height: 45,
		borderRadius: 45 / 2,
	},
	titleSubtitleSytle: {
		flexDirection: 'column',
		marginLeft: 16,
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
		fontFamily: 'Prompt-Bold',
		fontSize: 13,
		color: '#1D9D9E',
		marginTop: 10,
		textAlign: 'center',
	},
	textHeader: {
		color: 'black',
		fontSize: 20,
		paddingLeft: 20,
		marginBottom: 10,
		fontFamily: 'Prompt-Bold',
	},
});
export default Complaint;
