import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TextInput, StyleSheet, ScrollView, AsyncStorage, Alert } from 'react-native';
import { Button } from 'react-native-elements';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      LastName: "",
      Mobile: "",
      Email: "",
      IdCard: ""
    };
  }
  Register = async () => {
    try {
      const { Name, LastName, Mobile, Email, IdCard } = this.state
      await AsyncStorage.setItem('Name', Name)
      await AsyncStorage.setItem('LastName', LastName)
      await AsyncStorage.setItem('Mobile', Mobile)
      await AsyncStorage.setItem('Email', Email)
      await AsyncStorage.setItem('IdCard', IdCard)
      if (this.state.Name.length == '') {
        Alert.alert('กรุณากรอกชื่อจริงของท่าน')
      } else if (this.state.LastName.length == '') {
        Alert.alert('กรุณากรอกนามสกุลจริงของท่าน')
      } else if (this.state.Mobile.length == '') {
        Alert.alert('กรุณากรอกเบอร์โทร')
      } else if (this.state.Email.length == '') {
        Alert.alert('กรุณากรอกอีเมล')
      } else if (this.state.IdCard.length == '') {
        Alert.alert('กรุณากรอกบัตรประชาชน')
      } else {
        Alert.alert('กรอกข้อมูลสำเร็จ')
        this.props.navigation.navigate("Complain")
      }

      // this.props.navigation.navigate("Complain")
      // var user = await AsyncStorage.getItem('Email');
      console.log(user)
    } catch (e) {
      // saving error
    }
  }
  Data = async () => {
    try {
      var Name = await AsyncStorage.getItem('Name');
      console.log("Name: " + Name);
      if (Name != null)
        return this.props.navigation.replace("Complain")
      alert(Name);
    }
    catch (error) {
      alert(error)
    }
  }

  componentDidMount() {
    this.Data();
  }

  render() {
    return (
      <ImageBackground source={require("../image/bg.png")} resizeMode="stretch" style={{ width: "100%", height: "100%", justifyContent: "flex-start", alignItems: "center" }}>
        <ScrollView style={{ flexGrow: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Image source={require("../image/home.png")} style={{ width: 120, height: 120, marginTop: 20 }}></Image>
          </View>
          <View style={{ marginTop: 10 }}>
            <TextInput style={style.textInput} placeholder="ชื่อ" placeholderTextColor="gray" keyboardType={"default"} onChangeText={(text) => this.setState({ Name: text })}></TextInput>
            <TextInput style={style.textInput} placeholder="นามสกุล" placeholderTextColor="gray" keyboardType={"default"} onChangeText={(text) => this.setState({ LastName: text })}></TextInput>
            <TextInput style={style.textInput} placeholder="เบอร์โทร" placeholderTextColor="gray" maxLength={10} keyboardType={"phone-pad"} onChangeText={(text) => this.setState({ Mobile: text })}></TextInput>
            <TextInput style={style.textInput} placeholder="อีเมล" placeholderTextColor="gray" keyboardType={"email-address"} onChangeText={(text) => this.setState({ Email: text })}></TextInput>
            <TextInput style={style.textInput} placeholder="เลขบัตรประชาชน" placeholderTextColor="gray" maxLength={13} keyboardType={"numeric"} onChangeText={(text) => this.setState({ IdCard: text })}></TextInput>
          </View>
          <View style={{marginTop:10,marginLeft:50,marginRight:50}}>
            <Button title="บันทึก" onPress={this.Register} ></Button>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const style = StyleSheet.create(
  {
    textInput: {
      color: 'black',
      backgroundColor: 'white',
      borderColor: '#126635',
      borderRadius: 10,
      height: 40,
      width: 320,
      margin: 5,
    }
  }
)

export default Register;
