import React from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import HomeScreen from './screens/HomeScreen';
import BuyScreen from './screens/BuyScreen';

import {store, persistor} from './redux/store';
import {LogBox} from 'react-native';
import SummerScreen from './screens/SummerScreen';
import FallScreen from './screens/FallScreen';
import WinterScreen from './screens/WinterScreen';
import SpringScreen from './screens/SpringScreen';

const Stack = createStackNavigator();

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BUY"
              component={BuyScreen}
              options={{title: 'BUY'}}
            />
            <Stack.Screen
              name="Summer"
              component={SummerScreen}
              options={{title: 'Summer'}}
            />
            <Stack.Screen
              name="Fall"
              component={FallScreen}
              options={{title: 'Fall'}}
            />
            <Stack.Screen
              name="Spring"
              component={SpringScreen}
              options={{title: 'Spring'}}
            />
            <Stack.Screen
              name="Winter"
              component={WinterScreen}
              options={{title: 'Winter'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}