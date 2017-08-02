import React, { Component } from 'react';
import { Store } from '../index';
import { observer } from 'mobx-react'

import './screenshot.css';

export const Screenshot = observer(class Screenshot extends Component {
	render() {
		return (
			<div>
				<div className="screenshot"><img alt={'Screenshot at ' + this.props.imagePath} src={Store.imageStore.get(this.props.imageData)} /></div>
			</div>
		)
	}
});