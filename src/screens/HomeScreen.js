import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions,
  ImageBackground, 
  Image,
  FlatList, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const brokenData= [
  {id: 1, image: images.belling, title: `Belling The Cat`, label: `Long ago, on a farm in a faraway land there lived a tomcat. The plump cat walked on padded feet. It would sit on bales of hay or upon a loft or a window and pounce on mice when they least expected it.
  One day, as the cat slept on the branch of a tree, the mice held a meeting in the barn. They discussed many ideas to escape from the cat or get rid of it but could not decide on anything. Finally, a young mouse piped up, “Why don’t we tie a bell around the cat’s neck? This way, we will know at all times where he is and run away when it approaches.”
  All the mice cheered aloud and slapped his back to congratulate him on such a bright idea.
  Just then, a wise old mouse said, “The young one’s idea is excellent. All I want to know is, ‘Who will bell the cat?’”
  All the mice looked at each other. No one dared approach the cat. Suddenly, a shadow loomed in the doorway. The mice scampered away. The cat licked its lips and walked into the barn.
  `},
  {id: 2, image: images.theoxand, title: `The Ox and Frogs`,label: `On the outskirts of town, there once was a pool of water. Many frogs large and small used to live in and around the pool. They would hide under fronds and hop onto lotus leaves large as dishes.
  Every evening, cattle would return to their homes raising dust sky high. The ground would shake under the frogs and the cattle seemed like monsters to the trembling frogs. Their croaking would stop till the cattle passed.
  One evening, a tired and thirsty ox waded into the pool. As he walked into the pool he did not realize that a little frog had gotten squished under his hoof. The little frog’s friends hopped away croaking loudly.
  After the ox left, the little frogs approached a large old frog. They sobbed, “We saw a large monster today. It killed our friend.”
  “Monster? A large one! Was it bigger than me, little ones?”
  “Way bigger than you!”
  The frog puffed himself up in annoyance and snapped, “This big?”
  “No, much bigger,” claimed the frogs.
  “You have not lost your tails yet, you tadpoles! Everything seems large to you,” croaked the old frog.
  Now the little frogs laughed out loud, “We may be young and small, uncle, but you cannot ever be as big as that monster.”
  This enraged the old frog. He puffed himself up and spread his front legs and puffed out his chest. But this time he had gone too far. He burst into pieces as the little frogs looked on in horror.
  `},
  {id: 3, image: images.theungrateful, title: `The Ungrateful Travelers`,label: `Long, long ago two weary travelers decided to lie down under a tree. After a while, they felt rested. The two stretched and sat down to have lunch. When they opened their boxes they realized they didn’t have much food left. They looked up at the tree to see if it had any fruit. Unfortunately, there was no fruit. One of the travelers said, “What an awful tree! It bears no fruit.”
  The other replied, “What’s the use of a tree that bears no fruit?”
  Suddenly, they heard a booming voice, “Ungrateful wretches! Lying in my shade, listening to the songs of the birds in my branches, you fell asleep. You woke up refreshed and hungry. Is it my fault that you have no food in your boxes? How am I to blame if this is not the season when I bear fruit? Truly unfortunate are you that you do not count your blessings, or appreciate what you get!”
  The two men realized they were wrong and walked away deep in thought.
  `},
  {id: 4, image: images.twogoats, title: `Two Goats`,label: `Two frisky young goats were playing on hills facing each other. Between the hills was a fast-flowing river. The only way to cross the river was to go across the trunk of an old oak that acted as the bridge.
  By afternoon, the goats had both wandered to this bridge. As luck would have it, both of them decided to step on the bridge at the same time. The bridge was so narrow that there was no way the two goats could walk past each other. But neither goat wanted to give in.
  They were young. They had just started knocking heads with others in their herd and here was a ready-made way for them to prove who was stronger. So neither goat backed down. They kept pushing each other and locked horns.
  Suddenly, one of the goats slipped and took the other with it. Had they only been wise enough to give way, they would not have fallen to their deaths.
  `},
  {id: 5, image: images.thewickedwolf, title: `The Wicked Wolf`,label: `An old wolf that could no longer hunt, found a dead deer in the jungle. He was hungry and greedy and afraid that the lion that killed the deer might come back soon. He gobbled up large chunks of meat, till a large bone stuck in his throat.
  He let out a long loud howl. He roamed left and right and asked for help but who in their right mind would put their head in a wolf’s mouth!
  Finally, the wolf met a young crane and promised her a big reward if she took out the bone. The greedy young crane decided to help. With her long beak and neck, she easily pulled out the bone. The wolf promptly turned around and started to leave.
  The crane said, “Hello, hello, what’s going on? Where’s my reward?”
  The wolf said, “Reward? Didn’t I just give it to you? How many animals put their neck in the mouth of a wolf and live to tell the tale? I have spared your life. Isn’t that the greatest reward?” He laughed and left.
  Too late, the crane understood that the wicked never fulfill their promises.
  
  `},
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);

  const dispatch = useDispatch();

  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }

  const onClickStartButton = (label, title) => {
    if(points.value <= 0){
      Alert.alert("Please buy more turn!");
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Item", {
      labelText: label,
      titleText: title,
    });
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.view} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Image source={images.wellcomeToKorea} style={appStyle.itemView} />
      <View style={appStyle.centerView}>
        <FlatList 
          data={brokenData}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => onClickStartButton(item.label, item.title)}>
              <Image source={item.image} style={appStyle.itemView} />
            </TouchableOpacity>
          )}
        />
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
    justifyContent: 'flex-start',
    resizeMode: 'cover',
  },
  appBar: {
    flex: 0.1,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.2,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'black',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  brokenImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
  itemView: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  text: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  centerView: {
    flex: 0.9,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    resizeMode: 'cover',
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