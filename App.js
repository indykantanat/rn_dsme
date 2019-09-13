import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions,RefreshControl } from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation';

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
global.currentScreenIndex = 0;
console.disableYellowBox = true;

class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('./image/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

//For React Navigation 2.+ need to use StackNavigator instead createStackNavigator
//const FirstActivity_StackNavigator = StackNavigator({

//For React Navigation 3.+

const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: Screen1,
    navigationOptions: ({ navigation }) => ({
      title: 'เทศบาลนครลำปาง',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#126635',
      },
      headerTintColor: '#fff',
    }),
  },
  Setting: { screen: Setting },
  Changepassword: { screen: Changepassword }
});

const Complain_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here

  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => ({
      title: 'ร้องเรียน',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#126635',
      },
      headerTintColor: '#fff',
    }),
  },
  Complain: {
    screen: Complain,
    navigationOptions: ({ navigation }) => ({
      title: 'ร้องเรียน',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: '#126635',
      },
      headerTintColor: '#fff',
    }),
  },
  Listcomplain: { screen: Listcomplain },
  Addcomplaint: { screen: Addcomplaint },
  Detailcomplain: { screen: Detailcomplain }
});
//For React Navigation 2.+ need to use StackNavigator instead createStackNavigator
//const FirstActivity_StackNavigator = StackNavigator({

//For React Navigation 3.+

const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Second: {
    screen: Screen2,
    navigationOptions: ({ navigation }) => ({
      title: 'ข่าวสาร',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#126635',
      },
      headerTintColor: '#fff',
    }),
  }, Detailnew: { screen: Detailnew },
});
const About_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => ({
      title: 'เกี่ยวกับเรา',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#126635',
      },
      headerTintColor: '#fff',
    }),
  },
});
const Contact_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Contact: {
    screen: Contact,
    navigationOptions: ({ navigation }) => ({
      title: 'ติดต่อเรา',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#126635',
      },
      headerTintColor: '#fff',
    }),
  },
});
const DrawerNavigatorExample = createDrawerNavigator({
  //Drawer Optons and indexingn

  Screen1: {
    //Title
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'หน้าหลัก',
      drawerIcon: ({ }) => (
        <Image source={require("./image/home.png")} style={{ width: 24, height: 24 }}>
        </Image>
      ),
    },
  },
  Screen2: {
    //Title
    screen: Complain_StackNavigator,
    navigationOptions: {
      drawerLabel: 'ร้องเรียน',
      drawerIcon: ({ }) => (
        <Image source={require("./image/home.png")} style={{ width: 24, height: 24 }}>
        </Image>
      ),
    },
  },
  Screen3: {
    //Title
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'ข่าวสาร',
      drawerIcon: ({ }) => (
        <Image source={require("./image/home.png")} style={{ width: 24, height: 24 }}>
        </Image>
      ),
    },
  },
  Screen4: {
    //Title
    screen: About_StackNavigator,
    navigationOptions: {
      drawerLabel: 'เกี่ยวกับเรา',
      drawerIcon: ({ }) => (
        <Image source={require("./image/home.png")} style={{ width: 24, height: 24 }}>
        </Image>
      ),
    },
  },
  Screen5: {
    //Title
    screen: Contact_StackNavigator,
    navigationOptions: {
      drawerLabel: 'ติดต่อเรา',
      drawerIcon: ({ }) => (
        <Image source={require("./image/home.png")} style={{ width: 24, height: 24 }}>
        </Image>
      ),
    },
  },
});
export default createAppContainer(
  createDrawerNavigator({ DrawerNavigatorExample })
);

