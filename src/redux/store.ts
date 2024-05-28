import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from './reducers/authSlice';
import { courseReducer } from './reducers/courseSlice';
import { studentReducer } from './reducers/studentSlice';
import { helperReducer } from './reducers/helperSlice';
import { instructorReducer } from './reducers/instructorSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['course', 'student', 'instructor'], //
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        auth: authReducer,
        course: courseReducer,
        student: studentReducer,
        helper: helperReducer,
        instructor: instructorReducer,
    }),
);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export type State = typeof store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store, persistor };
