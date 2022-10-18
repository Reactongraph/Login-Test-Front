import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createRootReducer } from './reducers';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const configureAppStore = () => {
  const store = configureStore({
    reducer: createRootReducer(),
    middleware: customizedMiddleware,
  });

  return store;
};

export const store = configureAppStore();
