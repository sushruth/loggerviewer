import React, { Component } from 'react';
import { observer } from 'mobx-react'
import { Store, Screenshot, NetworkCall } from '../index';

import './timeline.css';

export const Timeline = observer(class Timeline extends Component {
	render() {
		let entries = Store.logStore.map((entry, index) => {
			if(entry.hasOwnProperty('action') && entry.action === 'Screenshot' && entry.enabled) {
				return <div key={index} className="timelineChild"><Screenshot imageData={entry.resource} imagePath={entry.url} /></div>;
			} else {
				if(Store.isHostAllowed(entry.request.url.hostname)) {
					return <div key={index} className="timelineChild"><NetworkCall call={entry} /></div>;
				} else {
					return '';
				}
			}
		});

		return (
			<div className="timeline">
				{entries}
			</div>
		);
	}
});