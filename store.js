import {createStore} from '@reduxjs/toolkit';
import userReducer from './slices';

export const store = createStore(userReducer);