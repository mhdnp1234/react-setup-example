import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {Router, browserHistory, applyRouterMiddleware} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store';
import {syncHistoryWithStore} from 'react-router-redux';
import {useScroll} from 'react-router-scroll';
// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import {selectLocationState} from './selectors'; // eslint-disable-line import/no-unresolved

const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectLocationState(),
});

render(
	<Provider  store={store}>
		<Router
			history={history}
			routes={routes}
			render={
			// Scroll to top when going to a new page, imitating default browser
			// behaviour
			applyRouterMiddleware(useScroll())
			}
		/>
	</Provider>
	,
	document.getElementById('app')
);