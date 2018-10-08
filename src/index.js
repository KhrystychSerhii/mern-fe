import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
// Reducers
import reducers  from './reducers';
// CSS
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// App
import App from './App';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk))); //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();