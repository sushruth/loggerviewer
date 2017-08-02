import React, { Component } from 'react';
import {observer} from 'mobx-react';

import { Header, DropBox, Store, Timeline } from './components';

import './App.css';
import './../node_modules/highlight.js/styles/xcode.css';

const App = observer(class App extends Component {
	render() {
		return (
			<div className="container">
				<Header />
				{Store.logStoreIsSet ? <Timeline /> : <DropBox displayType="full" />}
			</div>
		);
	}
})

export default App;
