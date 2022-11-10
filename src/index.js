import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import RefreshProvider from './components/RefreshProvider/RefreshProvider';

import App from './App';

import store from './store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<RefreshProvider>
				<App />
			</RefreshProvider>
		</BrowserRouter>
	</Provider>
);
