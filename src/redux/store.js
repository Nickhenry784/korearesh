import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import pointsReducer from './pointSlice';
import noteSlice from './noteSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};

const rootReducer = combineReducers({
  points: pointsReducer,
  note: noteSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);