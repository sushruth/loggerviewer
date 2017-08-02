import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Store } from '../index'

import './header.css';

export const Header = observer(class Header extends Component {
	render() {
		return (
			<div className="header flex">
				<div className="item center shrink logo">
					<img src={require('./../../assets/images/icon96.png')} alt="(Logo)" />
				</div>
				<div className="item top flex col">
					<h1 className="item title">Log viewer</h1>
					<div className="item desc">Companion tool for the logger plugin</div>
				</div>
				{Store.logStoreIsSet ? <div className="item filtersAndIcons flex center">
					<div className="item">
						Filters here
					</div>
				</div> : ''}
			</div>
		)
	}
});