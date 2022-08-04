import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
  PermissionsAndroid} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";
import { captureScreen } from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, bg: images.imgto1},
  {id: 2, bg: images.imgto2},
  {id: 3, bg: images.imgto3},
  {id: 4, bg: images.imgto4},
  {id: 5, bg: images.imgto5},
  {id: 6, bg: images.imgto6},
  {id: 7, bg: images.imgto7},
  {id: 8, bg: images.imgto8},
  {id: 9, bg: images.imgto9},
  {id: 10, bg: images.imgto10},
];

const dataTicket = [
  {id: 1, bg: images.st1},
  {id: 2, bg: images.st2},
  {id: 3, bg: images.st3},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(0);
  const [show, setShowImg] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [popup, setPopup] = useState(false);
  const [text, onChangeText] = useState("");
  const [ticket, setTicket] = useState(null);
  const [savedImagePath, setSavedImagePath] = useState('');

  const onClickNextBtn = () => {
    if(index !== 9){
      setIndex(index + 1);
    }
  }

  const onClickBackBtn = () => {
    if(index !== 0){
      setIndex(index - 1);
    }else{
      navigation.goBack();
    }
  }

  const onClickShowImg = () => {
    setShowTicket(false);
    setShowImg(!show);
  }

  const onClickShowTicket = () => {
    setShowImg(false);
    setShowTicket(!showTicket);
  }

  const takeScreenShot = () => {
    // To capture Screenshot
    getPermissionAndroid();
    captureScreen({
      // Either png or jpg (or webm Android Only), Defaults: png
      format: 'jpg',
      // Quality 0.0 - 1.0 (only available for jpg)
      quality: 0.8, 
    }).then(
      //callback function to get the result URL of the screnshot
      (uri) => {
        setSavedImagePath(uri);
        const image = CameraRoll.save(uri, 'photo');
	  if (image) {
			Alert.alert('Image saved', 'Successfully saved image to your gallery.',
				[{text: 'OK', onPress: () => {}}],
				{cancelable: false},
			);
	  }
      },
      (error) => console.error('Oops, Something Went Wrong', error),
    );
  };

  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Image Download Permission',
        message: 'Your permission is required to save images to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert('Permission required', 'Permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      //console.log('err', err);
      Alert.alert('Save remote image', 'Failed to save Image: ' + err.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };

  return (
    <ImageBackground style={appStyle.homeView} source={dataBg[index].bg}>
      {text !== "" && 
        <View style={appStyle.textView}>
          <Text style={appStyle.text}>{text}</Text>
        </View>
      }
      {
        ticket !== null && 
          <View style={appStyle.ticketView}>
            <Image source={ticket} style={{
              width: windowWidth * 0.3,
              height: windowHeight * 0.2,
              resizeMode: 'contain',
              transform: [{
                rotate: '-30deg',
              }]
            }} />
          </View>
        
      }
      <View style={appStyle.listView}>
        {show && <FlatList 
          data={dataBg}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setIndex(index)} style={appStyle.itemView}>
              <Image source={item.bg} style={appStyle.imgItem} />
            </TouchableOpacity>
          )}
        />}
        {
          showTicket && <FlatList 
          data={dataTicket}
          horizontal={true}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => setTicket(item.bg)} style={appStyle.itemView}>
              <Image source={item.bg} style={appStyle.imgItem} />
            </TouchableOpacity>
          )}
          />
        }
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={() => onClickShowImg()}>
          <Image source={images.cake} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPopup(!popup)}>
          <Image source={images.text} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onClickShowTicket()}>
          <Image source={images.sticker} style={appStyle.btn} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => takeScreenShot()}>
          <Image source={images.save} style={appStyle.btn} />
        </TouchableOpacity>
      </View>
      {popup && (
      <View style={appStyle.popupView}>
        <ImageBackground style={appStyle.popupImage} source={images.bangtext}>
          <TextInput
            style={appStyle.input}
            onChangeText={onChangeText}
            value={text}
            placeholder={"Text Here"}
          />
          <View style={appStyle.closeView}>
            <TouchableOpacity onPress={() => setPopup(false)}>
              <Image source={images.Oknote} style={appStyle.okBtn} />
            </TouchableOpacity>
          </View>
          
        </ImageBackground>
      </View>)}
    </ImageBackground>
  );
};

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  ticketView: {
    position: 'absolute',
    top: '10%',
    left: '10%',
  },
  textView: {
    position: 'absolute',
    top: '10%',
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Boss babe',
  },
  popupImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  closeView: {
    position: 'absolute',
    bottom: '0%',
  },
  input: {
    height: 60,
    margin: 12,
    width: windowWidth * 0.6,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    fontFamily: "Boss babe",
    color: 'black',
  },
  popupView: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(1, 1, 1, 0.7)',
    position: 'absolute',
    top: '0%',
    left: '0%',
    right: '0%',
    bottom: '0%',
  },
  okBtn: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  listView: {
    width: windowWidth,
    height: windowHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '13%',
  },
  itemView: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgItem: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.2,
    resizeMode: 'contain',

  },
  btn: {
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    height: windowHeight * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    bottom: '0%',
  },
});

export default ItemScreen;