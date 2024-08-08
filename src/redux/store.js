import rootReducer from "./reducer/rootReducer";
import { createStore } from "redux";
// configureStore.js
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//Lưu dữ liệu người dùng mỗi lần f5 lại trang, dùng redux-persist
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
let persistor = persistStore(store)

export { store, persistor }
