import React, { Component } from 'react';
import {
	View,
	Image,
	TouchableOpacity,
	Dimensions,
	RefreshControl,
	StyleSheet,
	Text,
	AsyncStorage,
	Alert,
} from 'react-native';

import {
	createDrawerNavigator,
	createStackNavigator,
	createAppContainer,
	createSwitchNavigator,
	createMaterialTopTabNavigator,
	createBottomTabNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import Screen1 from './screens/MainActivity';
import Screen2 from './screens/New';
import Detailnew from './screens/Detailnew';
import CustomSidebarMenu from './CustomSidebarMenu';
import About from './screens/About';
import Contact from './screens/Contact';
import Register from './screens/Register';
import Complain from './screens/Complain';
import Listcomplain from './screens/Listcomplain';
import Addcomplaint from './screens/Addcomplaint';
import Detailcomplain from './screens/Detailcomplain';
import Setting from './screens/Setting';
import Changepassword from './screens/Changepassword';
import OtherMenu from './screens/OtherMenu';
import NewsCategory from './screens/NewsCategory';
import { colors } from 'react-native-elements';
import { styles } from 'react-native-image-slider-box/SliderBox';
import NewsDetail from './screens/NewsDetail';
import NewsSubcategory from './screens/NewsSubcategory';
import Traveldetail from './screens/Traveldetail';
import TravelCategory from './screens/TravelCategory';
import TravelSubcategory from './screens/TravelSubcategory';
import Login from './screens/Login';
import ProfileUser from './screens/ProfileUser';

import ProductDetail from './screens/ProductDetail';
import ProductCategory from './screens/ProductCategory';
import ProductSubcategory from './screens/ProductSubcategory';
import Mapnavigate from './screens/Mapnavigate';
import PhoneCall from './screens/PhoneCall';
import GeneralData from './screens/GeneralData';
import Vision from './screens/Vision';
import Termofservice from './screens/Termofservice';





global.currentScreenIndex = 0;
console.disableYellowBox = true;

// class NavigationDrawerStructure extends Component {
//Structure for the navigatin Drawer
// toggleDrawer = () => {
//   //Props to open/close the drawer
//    this.props.navigationProps.toggleDrawer();
// };
// render() {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
{
	/*Donute Button Image */
}
{
	/* <Image
            source={require('./image/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          /> */
}
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

//For React Navigation 2.+ need to use StackNavigator instead createStackNavigator
//const FirstActivity_StackNavigator = StackNavigator({

//For React Navigation 3.+
// const FirstActivity_StackNavigator = createStackNavigator({
//   //All the screen from the Screen1 will be indexed here
//   First: {
//     screen: Screen1,

//     navigationOptions: ({ navigation }) => ({
//       headerTitle: (<Image style={{ width: 100, height: 100 }} source={require('../rn_Dsme/image/logomain3.png')} />),// img header ไม่มา

//       headerTitle: <Text style={{
//         textAlign: 'center', flex: 1, fontFamily:
//           "Prompt-Regular", fontSize: 23, color: 'white'
//       }}>เทศบาลเมืองสนั่นรักษ์</Text>,

//       // title: 'เทศบาลเมืองสนั่นรักษ์',

//       headerStyle: {

//         backgroundColor: '#6633cc',
//       },
//       // headerTintColor: '#ffffff',
//     }),
//   },

//   TravelCategory:{screen:TravelCategory},
//   Traveldetail:{screen:Traveldetail},
//   NewsDetail:{screen:NewsDetail},
//   // Setting: { screen: Setting },
//   // Changepassword: { screen: Changepassword }

// });

// const Complain_StackNavigator = createStackNavigator({
//   //All the screen from the Screen1 will be indexed here

//   Complain: {
//     screen: Complain,
//     navigationOptions: ({ navigation }) => ({

//       headerTitle: <Text style={{
//         textAlign: 'center', flex: 1, fontFamily:
//           "Prompt-Regular", fontSize: 20, color: 'white'
//       }}>สมัครสมาชิก</Text>,
//       // title: 'เข้าสู่ระบบหรือสมัครสมาชิก',

//       headerStyle: {
//         backgroundColor: '#6633cc',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
//   Complain: {
//     screen: Complain,
//     navigationOptions: ({ navigation }) => ({

//       headerTitle:<View>
//             <Text style={{fontFamily:'Prompt-Regular',color:'#FFF',fontSize:20}}>
//                 {'เเจ้งเรื่องร้องทุกข์'}
//             </Text>
//             </View>,
//       headerTintColor: '#fff',
//       headerTitleStyle: {
//         fontWeight: 'bold',
//       },

//       headerStyle: {
//         backgroundColor: '#6633cc',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
//   Listcomplain: { screen: Listcomplain },
//   Addcomplaint: { screen: Addcomplaint },
//   Detailcomplain: { screen: Detailcomplain }
// });
// //For React Navigation 2.+ need to use StackNavigator instead createStackNavigator
// //const FirstActivity_StackNavigator = StackNavigator({

// //For React Navigation 3.+

// const Screen2_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   Second: {
//     screen: Screen2,
//     navigationOptions: ({ navigation }) => ({
//       headerTitle: <Text style={{
//         textAlign: 'center',
//         flex: 1, fontFamily:
//           "Prompt-Regular",
//           fontSize: 20,
//           color: 'white'
//       }}>ข่าวสารเทศบาล</Text>,

//       headerStyle: {
//         backgroundColor: '#6633cc',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
//    Detailnew: { screen: Detailnew },

// });
// // const About_StackNavigator = createStackNavigator({
// //   //All the screen from the Screen2 will be indexed here
// //   About: {
// //     screen: About,
// //     navigationOptions: ({ navigation }) => ({
// //       title: 'เกี่ยวกับเรา',

// //       headerStyle: {
// //         backgroundColor: '#6633cc',
// //       },
// //       headerTintColor: '#fff',
// //     }),
// //   },
// // });
// const Contact_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   Contact: {
//     screen: Contact,
//     navigationOptions: ({ navigation }) => ({
//       // title: 'ติดต่อเรา',
//       headerTitle: <Text style={{
//         textAlign: 'center', flex: 1, fontFamily:
//           "Prompt-Regular", fontSize: 20, color: 'white'
//       }}>ติดต่อเรา</Text>,

//       headerStyle: {
//         backgroundColor: '#6633cc',
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });

// const OtherMenu_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   OtherMenu: {
//     screen: OtherMenu,

//     navigationOptions: ({ navigation }) => ({
//       // title: 'เมนูอื่นๆ',
//       headerTitle: <Text style={{
//         textAlign: 'center', flex: 1, fontFamily:
//           "Prompt-Regular", fontSize: 20, color: 'white'
//       }}>เมนูอื่นๆ</Text>,

//       headerStyle: {
//         backgroundColor: '#6633cc',
//       },
//       headerTintColor: '#fff',
//     }),
//   },TravelCategory: { screen: TravelCategory },
//    NewsSubcategory: { screen: NewsSubcategory },
//    TravelSubcategory:{screen:TravelSubcategory},
//    Login : {screen: Login},
//    ProfileUser :{screen:ProfileUser}
//   // Complain:{screen:Complain},
// });

// const NewsCategory_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   NewsCategory: {
//     screen: NewsCategory,
//   },

//   SubCategory:{screen:NewsSubcategory},
//   NewsDetail:{screen:NewsDetail},
// });

// const TravelCategory_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   TravelCategory: {
//     screen: TravelCategory,
//   },
//      SubCatTravel  : {screen:TravelSubcategory},
//      TravelDetail : {screen:Traveldetail},

// });

// const TravelSubcat_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   TravelSubcategory: {
//     screen: TravelSubcategory,
//   },
//   TravelDetail:{screen:Traveldetail},
//   TravelCategory:{screen:TravelCategory},

// });

// const Traveldetail_StackNavigator = createStackNavigator({
//   //All the screen from the Screen2 will be indexed here
//   Traveldetail: {
//     screen: Traveldetail,
//   },
//   TravelCategory:{screen:TravelCategory},

// });

//  const Login_StackNavigator = createStackNavigator({
//       Login :{ screen : Login },

// });

// const ProfileUser_StackNavigator = createStackNavigator({
//   ProfileUser :{
//     screen : ProfileUser
//   },
//   OtherMenu:{screen:OtherMenu},

// });

// /* ------------------------------ tabbar screen ----------------------------- */

// const Tabbarr = createBottomTabNavigator({

//   Screen1: {
//     screen: FirstActivity_StackNavigator,
//     navigationOptions: () => ({
//       tabBarOptions: {
//         activeBackgroundColor: '#6633cc',
//         inactiveBackgroundColor: '#6633cc',
//         activeTintColor: '#fff',
//         inactiveTintColor: '#BABABA',
//       },
//       tabBarLabel: 'หน้าหลัก',

//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="md-home" color={tintColor} size={25} />

//       ),

//     }),

//   },

//   Screen2: {
//     //Title
//     screen: Complain_StackNavigator,
//     navigationOptions: {
//       tabBarOptions: {
//         activeBackgroundColor: '#6633cc',
//         inactiveBackgroundColor: '#6633cc',
//         activeTintColor: '#fff',
//         inactiveTintColor: '#BABABA',
//         borderTopColor: '#fff',
//       },
//       tabBarLabel: 'แจ้งเรื่องร้องทุกข์',
//       tabBarIcon: ({ tintColor }) => (

//         <Icon name="md-text" color={tintColor} size={25} />

//       ),

//     },
//   },
//   Screen3: {
//     //Title
//     screen: NewsCategory_StackNavigator,
//     navigationOptions: {
//       tabBarOptions: {
//         activeBackgroundColor: '#6633cc',
//         inactiveBackgroundColor: '#6633cc',
//         activeTintColor: '#fff',
//         inactiveTintColor: '#BABABA',
//         borderTopColor: 'violet',
//       },
//       tabBarLabel: 'ข่าวสาร',
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="ios-today" color={tintColor} size={25} />

//       ),
//     },
//   },

//   // Screen4: {
//   //   //Title
//   //   screen: About_StackNavigator,
//   //   navigationOptions: {
//   //     tabBarLabel: 'เมนูอื่นๆ',
//   //     tabBarIcon: ({ }) => (
//   //       <Image source={require("./image/contracttab.png")} style={{ width: 24, height: 24 }}>
//   //       </Image>
//   //     ),
//   //   },
//   // },

//   // Screen4: {
//   //   //Title
//   //   screen: Contact_StackNavigator,
//   //   navigationOptions: {
//   //     tabBarOptions: {

//   //       activeBackgroundColor: '#6633cc',
//   //       inactiveBackgroundColor: '#6633cc',
//   //       activeTintColor: '#fff',
//   //       inactiveTintColor: '#BABABA',
//   //       borderTopColor: 'red',
//   //       borderColor: 'violet',
//   //       borderWidth: 5,
//   //       borderBottomColor: 'red',
//   //       borderTopWidth: 5,
//   //     },
//   //     tabBarLabel: 'ติดต่อเรา',
//   //     fontFamily: "Prompt-Regular",
//   //     tabBarIcon: ({ tintColor }) => (
//   //       <Icon name="md-contacts" color={tintColor} size={25} />

//   //     ),
//   //   },
//   // },

//   Screen4: {
//     //Title
//     screen: Login_StackNavigator,
//     navigationOptions: {
//       tabBarOptions: {

//         activeBackgroundColor: '#6633cc',
//         inactiveBackgroundColor: '#6633cc',
//         activeTintColor: '#fff',
//         inactiveTintColor: '#BABABA',
//         borderTopColor: 'red',
//         borderColor: 'violet',
//         borderWidth: 5,
//         borderBottomColor: 'red',
//         borderTopWidth: 5,
//       },
//       tabBarLabel: 'ลงชื่อเข้าใช้',
//       fontFamily: "Prompt-Regular",
//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="md-contacts" color={tintColor} size={25} />

//       ),
//     },
//   },

//   Screen5: {
//     //Title
//     screen: OtherMenu_StackNavigator,
//     navigationOptions: {
//       tabBarOptions: {
//         activeBackgroundColor: '#6633cc',
//         inactiveBackgroundColor: '#6633cc',
//         activeTintColor: '#fff',
//         inactiveTintColor: '#BABABA',
//         borderTopColor: 'red',
//         borderColor: 'violet',
//         borderWidth: 5,
//         borderBottomColor: 'red',
//         borderTopWidth: 5,
//       },
//       tabBarLabel: 'เมนูอื่นๆ',

//       tabBarIcon: ({ tintColor }) => (
//         <Icon name="md-list-box" color={tintColor} size={25} />

//       ),
//     },ƒ
//   },

// });
/* -------------------------------------------------------------------------- */

class LogoTitle extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
				<Image
					source={require('../rn_Dsme/image/removebg500500.png')}
					style={{ width: 45, height: 45, alignContent: 'center', marginLeft: 80, margin: 5 }}
				/>
				<Text
					style={{
						textAlign: 'justify',
						flex: 1,
						fontFamily: 'Prompt-Regular',
						fontSize: 20,
						color: 'white',
						marginVertical: 10,
					}}
				>
					เทศบาลเมืองสนั่นรักษ์
				</Text>
			</View>
		);
	}
}
/* -------------------------------------------------------------------------- */
export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			Value: {},
		};
	}

	/* -------------------------------------------------------------------------- */

	componentDidMount() {
		AsyncStorage.getItem('Value').then(result => {
			//alert(result)
			this.setState({ login: result });
		});
	}

	/* -------------------------------------------------------------------------- */

	render() {
		const FirstActivity_StackNavigator = createStackNavigator({
			//All the screen from the Screen1 will be indexed here
			First: {
				screen: Screen1,

				navigationOptions: ({ navigation }) => ({
					headerTitle: () => <LogoTitle />,

					headerStyle: {
						backgroundColor: '#6633cc',
					},
				}),
			},
			TravelSubcategory: { screen: TravelSubcategory },
			TravelCategory: { screen: TravelCategory },
			Traveldetail: { screen: Traveldetail },
			NewsDetail: { screen: NewsDetail },
			ProductDetail: { screen: ProductDetail },
			Mapnavigate: { screen: Mapnavigate },
			Complain: { screen: Complain },
		});

		const Complain_StackNavigator = createStackNavigator({
			//All the screen from the Screen1 will be indexed here

			Complain: {
				screen: Complain,
				navigationOptions: ({ navigation }) => ({
					headerTitle: (
						<Text
							style={{
								textAlign: 'center',
								flex: 1,
								fontFamily: 'Prompt-Regular',
								fontSize: 20,
								color: 'white',
							}}
						>
							สมัครสมาชิก
						</Text>
					),
					// title: 'เข้าสู่ระบบหรือสมัครสมาชิก',

					headerStyle: {
						backgroundColor: '#6633cc',
					},
					headerTintColor: '#fff',
				}),
			},

			Complain: {
				screen: Complain,
				navigationOptions: ({ navigation }) => ({
					headerTitle: (
						<View>
							<Text style={{ fontFamily: 'Prompt-Regular', color: '#FFF', fontSize: 20 }}>
								{'เเจ้งเรื่องร้องทุกข์'}
							</Text>
						</View>
					),
					headerTintColor: '#fff',
					headerTitleStyle: {
						fontWeight: 'bold',
					},

					headerStyle: {
						backgroundColor: '#6633cc',
					},
					headerTintColor: '#fff',
				}),
			},
			Listcomplain: { screen: Listcomplain },
			Addcomplaint: { screen: Addcomplaint },
			Detailcomplain: { screen: Detailcomplain },
			//Login:{screen: Login},
		});
		//For React Navigation 2.+ need to use StackNavigator instead createStackNavigator
		//const FirstActivity_StackNavigator = StackNavigator({

		//For React Navigation 3.+

		const Screen2_StackNavigator = createStackNavigator({
			//All the screen from the Screen2 will be indexed here
			Second: {
				screen: Screen2,
				navigationOptions: ({ navigation }) => ({
					headerTitle: (
						<Text
							style={{
								textAlign: 'center',
								flex: 1,
								fontFamily: 'Prompt-Regular',
								fontSize: 20,
								color: 'white',
							}}
						>
							ข่าวสารเทศบาล
						</Text>
					),

					headerStyle: {
						backgroundColor: '#6633cc',
					},
					headerTintColor: '#fff',
				}),
			},
			Detailnew: { screen: Detailnew },
		});
		// const About_StackNavigator = createStackNavigator({
		//   //All the screen from the Screen2 will be indexed here
		//   About: {
		//     screen: About,
		//     navigationOptions: ({ navigation }) => ({
		//       title: 'เกี่ยวกับเรา',

		//       headerStyle: {
		//         backgroundColor: '#6633cc',
		//       },
		//       headerTintColor: '#fff',
		//     }),
		//   },
		// });
		const Contact_StackNavigator = createStackNavigator({
			//All the screen from the Screen2 will be indexed here
			Contact: {
				screen: Contact,
				navigationOptions: ({ navigation }) => ({
					// title: 'ติดต่อเรา',
					headerTitle: (
						<Text
							style={{
								textAlign: 'center',
								flex: 1,
								fontFamily: 'Prompt-Regular',
								fontSize: 20,
								color: 'white',
							}}
						>
							ติดต่อเรา
						</Text>
					),

					headerStyle: {
						backgroundColor: '#6633cc',
					},
					headerTintColor: '#fff',
				}),
			},
		});

		const OtherMenu_StackNavigator = createStackNavigator({
			//All the screen from the Screen2 will be indexed here
			OtherMenu: {
				screen: OtherMenu,
				//screen: this.state.login != null ? ProfileUser_StackNavigator : Login_StackNavigator,
				navigationOptions: ({ navigation }) => ({
					headerTitle: (
						<Text
							style={{
								textAlign: 'center',
								flex: 1,
								fontFamily: 'Prompt-Regular',
								fontSize: 20,
								color: 'white',
							}}
						>
							เมนูอื่นๆ
						</Text>
					),

					headerStyle: {
						backgroundColor: '#6633cc',
					},
					headerTintColor: '#fff',
				}),
			},
			TravelCategory: { screen: TravelCategory },
			NewsSubcategory: { screen: NewsSubcategory },
			TravelSubcategory: { screen: TravelSubcategory },
			Login: { screen: Login },
			ProfileUser: { screen: ProfileUser },
			ProductCategory: { screen: ProductCategory },
			ProductSubcategory: { screen: ProductSubcategory },
			ProductDetail: { screen: ProductDetail },
			TravelDetail: { screen: Traveldetail },
      PhoneCall: { screen: PhoneCall },
      GeneralData: { screen: GeneralData	},
      Vision: {	screen: Vision	},
		});

		const NewsCategory_StackNavigator = createStackNavigator({
			//All the screen from the Screen2 will be indexed here
			NewsCategory: {
				screen: NewsCategory,
			},

			SubCategory: { screen: NewsSubcategory },
			NewsDetail: { screen: NewsDetail },
		});

		const TravelCategory_StackNavigator = createStackNavigator({
			//All the screen from the Screen2 will be indexed here
			TravelCategory: {
				screen: TravelCategory,
			},
			SubCatTravel: { screen: TravelSubcategory },
			//TravelDetail: { screen: Traveldetail },
		});

		const TravelSubcat_StackNavigator = createStackNavigator({
			//All the screen from the Screen2 will be indexed here
			TravelSubcategory: {
				screen: TravelSubcategory,
			},
			TravelDetail: { screen: Traveldetail },
			//TravelCategory: { screen: TravelCategory },
		});

		const Traveldetail_StackNavigator = createStackNavigator({
			//All the screen from the Screen2 will be indexed here
			Traveldetail: {
				screen: Traveldetail,
			},
			//TravelCategory: { screen: TravelCategory },
			//SubCatTravel: {screen: TravelSubcategory},
		});

		const Login_StackNavigator = createStackNavigator({
			Login: { screen: Login },
			Register: { screen: Register },
			Termofservice: {screen: Termofservice},
		});

		

		const ProfileUser_StackNavigator = createStackNavigator({
			ProfileUser: {
				screen: ProfileUser,
			},
			
		});

		const ProductDetail_StackNavigator = createStackNavigator({
			ProductDetail: {
				screen: ProductDetail,
			},
			Mapnavigate: { screen: Mapnavigate },
		});

		const ProductCategory_StackNavigator = createStackNavigator({
			ProductCategory: {
				screen: ProductCategory,
			},
			ProductSubcategory: { screen: ProductSubcategory },
			ProductDetail: { screen: ProductDetail },
		});

		const ProductSubcategory_StackNavigator = createStackNavigator({
			ProductSubcategory: {
				screen: ProductSubcategory,
			},
		});

		const Mapnavigate_StackNavigator = createStackNavigator({
			Mapnavigate: {
				screen: Mapnavigate,
			},
		});

		const PhoneCall_StackNavigator = createStackNavigator({
			PhoneCall: {
				screen: PhoneCall,
			},
    });
    
    const GeneralData_StackNavigator = createStackNavigator({
			GeneralData: {
				screen: GeneralData,
			},
    });

    const Vision_StackNavigator = createStackNavigator({
			Vision: {
				screen: Vision,
			},
		});

	const Termofservice_StackNavigator = createStackNavigator({
			Termofservice: {
				screen: Termofservice,
			},
		});
		

		/* ------------------------------ tabbar screen ----------------------------- */

		const Tabbarr = createBottomTabNavigator({
			Screen1: {
				screen: FirstActivity_StackNavigator,
				navigationOptions: () => ({
					tabBarOptions: {
						activeBackgroundColor: '#6633cc',
						inactiveBackgroundColor: '#6633cc',
						activeTintColor: '#fff',
						inactiveTintColor: '#BABABA',
						labelStyle: {
							fontSize: 12,
							fontFamily: 'Prompt-Regular',
						},
					},
					tabBarLabel: 'หน้าหลัก',

					tabBarIcon: ({ tintColor }) => <Icon name="md-home" color={tintColor} size={25} />,
				}),
			},

			Screen2: {
				screen: this.state.login == null ? Login_StackNavigator : Complain_StackNavigator,
				navigationOptions: {
					tabBarOptions: {
						activeBackgroundColor: '#6633cc',
						inactiveBackgroundColor: '#6633cc',
						activeTintColor: '#fff',
						inactiveTintColor: '#BABABA',
						borderTopColor: '#fff',
						labelStyle: {
							fontSize: 12,
							fontFamily: 'Prompt-Regular',
						},
					},
					tabBarLabel: 'แจ้งเรื่องร้องทุกข์',
					tabBarIcon: ({ tintColor }) => <Icon name="md-text" color={tintColor} size={25} />,
				},
				
			},

			Screen3: {
				//Title
				screen: NewsCategory_StackNavigator,
				navigationOptions: {
					tabBarOptions: {
						activeBackgroundColor: '#6633cc',
						inactiveBackgroundColor: '#6633cc',
						activeTintColor: '#fff',
						inactiveTintColor: '#BABABA',
						borderTopColor: 'violet',

						labelStyle: {
							fontSize: 12,
							fontFamily: 'Prompt-Regular',
						},
					},
					tabBarLabel: 'ข่าวสาร',
					tabBarIcon: ({ tintColor }) => <Icon name="ios-today" color={tintColor} size={25} />,
				},
			},

			Screen4: {
				//Title
				screen: this.state.login != null ? ProfileUser_StackNavigator : Login_StackNavigator,
				navigationOptions: {
					tabBarOptions: {
						activeBackgroundColor: '#6633cc',
						inactiveBackgroundColor: '#6633cc',
						activeTintColor: '#fff',
						inactiveTintColor: '#BABABA',
						borderTopColor: 'red',
						borderColor: 'violet',
						borderWidth: 5,
						borderBottomColor: 'red',
						borderTopWidth: 5,
						labelStyle: {
							fontSize: 12,
							fontFamily: 'Prompt-Regular',
						},
					},
					tabBarLabel: this.state.login != null ? 'โปรไฟล์' : 'ลงชื่อเข้าใช้',

					tabBarIcon: ({ tintColor }) => <Icon name="md-contacts" color={tintColor} size={25} />,
				},
				Register: { screen: Register },
			},

			Screen5: {
				//Title
				screen: OtherMenu_StackNavigator,
				navigationOptions: {
					tabBarOptions: {
						activeBackgroundColor: '#6633cc',
						inactiveBackgroundColor: '#6633cc',
						activeTintColor: '#fff',
						inactiveTintColor: '#BABABA',
						borderTopColor: 'red',
						borderColor: 'violet',
						borderWidth: 5,
						borderBottomColor: 'red',
						borderTopWidth: 5,
						labelStyle: {
							fontSize: 12,
							fontFamily: 'Prompt-Regular',
						},
					},
					tabBarLabel: 'เมนูอื่นๆ',

					tabBarIcon: ({ tintColor }) => <Icon name="md-list-box" color={tintColor} size={25} />,
				},
			},
		});

		const Appcontainer = createAppContainer(Tabbarr);
		return <Appcontainer></Appcontainer>;
	}
}

export default App;

// export default createAppContainer(Tabbarr)
