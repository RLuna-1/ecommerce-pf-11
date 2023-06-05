import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './view/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/Store';

axios.defaults.baseURL = 'http://localhost:3001';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
);

//cambia el nombre de la pestaña
let previousTitle = document.title;
window.addEventListener('blur', () => {
	previousTitle = document.title;
	document.title = 'CodeXpress - Vuelve pronto';
});

//devuelve el titulo original
window.addEventListener('focus', () => {
	document.title = previousTitle;
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
