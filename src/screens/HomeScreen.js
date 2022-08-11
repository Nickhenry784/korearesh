import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  FlatList, 
  Alert,  
  TextInput,
  ScrollView} from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [web, setWeb] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = () => {
    if(points.value <= 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    if(company === "" || address === "" || web === "" || email === "" || phone === ""){
      Alert.alert("Please input your information!");
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item",{
      company: company,
      address: address,
      web: web,
      email: email,
      phone: phone,
    });
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bgstart}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.turn} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', top: '5%'}}>
        <Image source={images.textstart} style={appStyle.brokenImage} />
      </View>
      <View style={{position: 'absolute',top: '20%', width: windowWidth, height: windowHeight * 0.6, alignItems: 'center', backgroundColor: 'white'}}>
        <ScrollView>
          <Text style={appStyle.labelText}>Name Company</Text>
          <TextInput
            style={appStyle.input}
            onChangeText={setCompany}
            value={company}
          />
          <Text style={appStyle.labelText}>Address</Text>
          <TextInput
            style={appStyle.input}
            onChangeText={setAddress}
            value={address}
          />
          <Text style={appStyle.labelText}>Website</Text>
          <TextInput
            style={appStyle.input}
            onChangeText={setWeb}
            value={web}
            keyboardType={"url"}
          />
          <Text style={appStyle.labelText}>Email</Text>
          <TextInput
            style={appStyle.input}
            onChangeText={setEmail}
            value={email}
            keyboardType={"email-address"}
          />
          <Text style={appStyle.labelText}>Phone</Text>
          <TextInput
            style={appStyle.input}
            onChangeText={setPhone}
            value={phone}
            keyboardType={"phone-pad"}
          />
        </ScrollView>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickStartButton()}>
          <Image source={images.Start} style={appStyle.itemView} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  input: {
    height: 50,
    width: windowWidth * 0.6,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 20,
  },
  appBar: {
    height: windowHeight * 0.1,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  brokenImage: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  labelText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',    
  },
  bottomView: {
    height: windowHeight * 0.15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneImage: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.7,
    resizeMode: 'contain',
    position: 'absolute',
    top: '0%',
  },
});

export default HomeScreen;