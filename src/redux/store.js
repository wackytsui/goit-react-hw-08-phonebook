
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { filterSlice } from './filterSlice';
import { contactsSlice } from './contactsSlice';

// Combine your reducers
const rootReducer = combineReducers({
  contacts: contactsSlice.reducer,
  filter: filterSlice.reducer,
});
// Create the persist config object
const persistConfig = {
  key: 'root',
  storage,
  // You can specify which parts of your state you want to persist here
  whitelist: ['contacts'], // In your case, you probably only want to persist contacts
};
// Wrap your rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);