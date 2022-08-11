import { 
  StyleSheet, 
  View, Dimensions, 
  ScrollView,
  Image, 
  Alert,  
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList} from "react-native";
import React, {useEffect, useState} from 'react';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const dataBg = [
  {id: 1, question: "What is the main cause of Soil erosion?", text: ["Industrialization  ","Defforestation","Earthquake","Roads Construction",], reulst: "Defforestation"},
  {id: 2, question: "Where is situated Dudhwa National Park?", text: ["Madhya Pradesh","Uttar Pradesh","Rajasthan","Haryana",], reulst: "Uttar Pradesh"},
  {id: 3, question: "The name of India derived from which river?", text: ["Indus River","Ganges River","Brahmaputra River","Sutlej River",], reulst: "Indus River"},
  {id: 4, question: "Which is the biggest thermal power plant in India?", text: ["Vindhyachal Thermal Power Station","Renusagar Thermal Power Plant","Anpara Thermal Power Plant","Reliance Sasan Ultra Mega Power",], reulst: "Vindhyachal Thermal Power Station"},
  {id: 5, question: "When was established National Defence Academy?", text: ["1951","1952","1953","1954",], reulst: "1954"},
  {id: 6, question: "What is the percentage of CO2 in atmosphere?", text: ["0.0391 percent","0.1001 Percent","1.0001 Percent","0.1001 Percent",], reulst: "0.0391 percent"},
  {id: 7, question: "Which is the most polluted city in the world?", text: ["Faridabad","Varanasi","Kanpur","Lucknow",], reulst: "Kanpur"},
  {id: 8, question: "Who is known as the father of Indian environmental science?", text: ["Ramdeo Mishra","Sunderlal Bahuguna","Vinobha Bhave","Raja Ram Mohan Roy",], reulst: "Ramdeo Mishra"},
  {id: 9, question: "Which of the following animal has the highest blood pressure?", text: ["Elephant","Giraffe","Lion","Rabbit",], reulst: "Giraffe"},
  {id: 10, question: "Where is located Silent Valley National Park?", text: ["Odisha","Kerala","Tamil Nadu","West Bengal",], reulst: "Kerala"},
  {id: 11, question: "Grand Central Terminal, Park Avenue, New York is the world’s_______?", text: ["Longest railway station","Highest railway station","Largest Railway Station","None of the above",], reulst: "Largest Railway Station"},
  {id: 12, question: "The world’s first ever thermal battery plant has been inaugurated in which Indian state?", text: ["Andhra Pradesh","Himachal Pradesh","Karnataka","Odisha",], reulst: "Andhra Pradesh"},
  {id: 13, question: "What is the name of the world’s first Greenhouse gases Observing Satellite launched by Japan in 2009?", text: ["Ibuki","Tadami","Akatsuki","Hayabusa",], reulst: "Ibuki"},
  {id: 14, question: "Fathometer is used to measure________?", text: ["Earthquakes","Rainfalls","Ocean Depth","Sound Intensity",], reulst: "Ocean Depth"},
  {id: 15, question: "What is the largest land in the human body?", text: ["Liver","Adrenal","Pituitary","Pineal",], reulst: "Liver"},
]

const ItemScreen = ({navigation, route}) => {

  const [index, setIndex] = useState(randomIntFromInterval(0,dataBg.length - 1));
  const [score, setScore] = useState(0);


  const onEndChangeText = (val) => {
    if(val.toLocaleLowerCase() === dataBg[index].reulst.toLocaleLowerCase()){
      setScore(score + 10);
      setIndex(randomIntFromInterval(0,dataBg.length - 1));
    }else{
      navigation.goBack();
    }
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.bg2}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.false} style={appStyle.btnBack} />
        </TouchableOpacity>
        <Text style={appStyle.scoreText}>{`Score: ${score}`}</Text>
      </View>
      <ImageBackground source={images.question} style={appStyle.square2}>
        <Text style={appStyle.textLabel}>{dataBg[index].question}</Text>
      </ImageBackground>
      
      <View style={appStyle.bottomView}>
        <FlatList 
          data={randomAnswer(dataBg[index].text)}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onEndChangeText(item)}>
              <ImageBackground source={images.square1} style={appStyle.foodImage}>
                <Text style={appStyle.label}>{item}</Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
};

export const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const randomAnswer = (list) => {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    list.splice(index,1);
    list.splice(randomIntFromInterval(0,4),0,element);
  }
  return list;
}

export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  textLabel: {
    fontSize: 30,
    fontFamily: 'Write Nice',
    color: 'white',
  },
  label: {
    fontSize: 20,
    fontFamily: 'Write Nice',
    color: 'white',
  },
  square2: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    height: windowHeight * 0.1,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  squareImage: {
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    marginHorizontal: 10,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bangImage: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
  },
  btn: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  scoreView: {
    position: 'absolute',
    top: '5%',
    right: '10%',
  },
  input: {
    height: 60,
    width: windowWidth * 0.6,
    backgroundColor: 'white',
    margin: 12,
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  boardImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.2,
    resizeMode: 'contain',
  },
  bottomView: {
    width: windowWidth,
    height: windowHeight * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '0%',
  },
  inputView: {
    width: windowWidth * 0.9,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  foodImage: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    marginVertical: 4,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    top: '3%',
    left: '3%'
  },
  scoreText: {
    fontSize: 25,
    fontFamily: 'Write Nice',
    color: 'black',
  },
  btnBack: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
});

export default ItemScreen;