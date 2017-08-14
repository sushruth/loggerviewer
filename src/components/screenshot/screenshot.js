import React, { Component } from 'react';
import { Store } from '../index';
import { observer } from 'mobx-react'

import './screenshot.css';

export const Screenshot = observer(class Screenshot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false
		};

		this.toggleOpen = this.toggleOpen.bind(this);
	}

	toggleOpen() {
		let oldState = this.state.open;
		this.setState({
			open: !oldState
		});
	}

	render() {

		let classNames = this.state.open ? 'screenshot open' : 'screenshot';

		return (
			<div>
				<div className={classNames}><img onClick={this.toggleOpen} alt={'Screenshot at ' + this.props.imagePath} src={Store.imageStore.get(this.props.imageData)} /></div>
			</div>
		)
	}
});