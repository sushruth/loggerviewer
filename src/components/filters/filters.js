import React, { Component } from 'react';
import { Store } from '../'

import './filters.css'

export class Filters extends Component {

	handleChange(e) {
		var options = e.target.options;
		var values = [];
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				values.push(options[i].value);
			}
		}
		Store.enableHosts(values);
	}

	render() {
		let options = Store.logFilters.hostlist.map((v, i) => <option key={i}>{v}</option>);
		return (
			<div>
				<select multiple onChange={this.handleChange}>
					{options}
				</select>
			</div>
		)
	}
}