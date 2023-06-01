import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunkMiddleware from "redux-thunk";

// esta linea es para conectar con la extension del navegador => REDUX DEVTOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,    
    composeEnhancers(applyMiddleware(thunkMiddleware)) /* esta línea es para poder hacer peticiones a un server */
);


export default store;