import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/reducer/reducer";
import thunk from "redux-thunk";

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

 const store = createStore(
    rootReducer,
    /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), */
    applyMiddleware(thunk)
  );
  
  export default store; 
